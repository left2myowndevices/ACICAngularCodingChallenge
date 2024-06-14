import { Component, OnInit } from '@angular/core';
import { RecentQuoteService } from '../recentQuoteService';
import {
  MappedInsuranceQuote,
  RecentQuote,
} from '../InsuranceQuote';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { LineOfBusiness } from '../LineOfBusiness';
import { mapQuotesToBusiness } from './quote-summary.utils';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-quote-summary',
  templateUrl: './quote-summary.component.html',
  styleUrls: ['./quote-summary.component.css'],
})
export class QuoteSummaryComponent implements OnInit {
  recentQuotes: RecentQuote = {};
  linesOfBusiness: LineOfBusiness[] = [];
  quotesMappedToBusiness: MappedInsuranceQuote[] = [];
  constructor(
    private recentQuoteService: RecentQuoteService,
    private lineOfBusinessService: LineOfBusinessService
  ) {}

  ngOnInit() {
    forkJoin({
      recentQuotes: this.recentQuoteService.getRecentQuotes(),
      linesOfBusiness: this.lineOfBusinessService.getLinesOfBusiness(),
    }).subscribe(({ recentQuotes, linesOfBusiness }) => {
      this.recentQuotes = recentQuotes;
      this.linesOfBusiness = linesOfBusiness;
      this.quotesMappedToBusiness = mapQuotesToBusiness(
        this.recentQuotes,
        this.linesOfBusiness
      );
    });
  }

  getLinesOfBusiness(): void {
    this.lineOfBusinessService
      .getLinesOfBusiness()
      .subscribe(
        (linesOfBusiness) =>
          (this.linesOfBusiness = linesOfBusiness.slice(1, 4))
      );
  }
}
