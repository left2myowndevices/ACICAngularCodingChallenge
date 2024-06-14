import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { InsuranceQuote } from '../InsuranceQuote';
import { RecentQuoteService } from '../recentQuoteService';

@Component({
  selector: 'app-lineOfBusiness-detail',
  templateUrl: './lineOfBusiness-detail.component.html',
  styleUrls: ['./lineOfBusiness-detail.component.css'],
})
export class LineOfBusinessDetailComponent implements OnInit {
  lineOfBusiness: LineOfBusiness | undefined;
  quotes: InsuranceQuote[] | undefined;
  id: number = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  constructor(
    private route: ActivatedRoute,
    private lineOfBusinessService: LineOfBusinessService,
    private recentQuoteService: RecentQuoteService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getLineOfBusiness();
    this.getQuotesByLineOfBusiness();
  }

  getLineOfBusiness(): void {
    this.lineOfBusinessService
      .getLineOfBusiness(this.id)
      .subscribe((lineOfBusiness) => (this.lineOfBusiness = lineOfBusiness));
  }

  getQuotesByLineOfBusiness(): void {
    this.recentQuoteService
      .getQuotesByLineOfBusiness(this.id)
      .subscribe((quotes) => (this.quotes = quotes));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.lineOfBusiness) {
      this.lineOfBusinessService
        .updateLineOfBusiness(this.lineOfBusiness)
        .subscribe(() => this.goBack());
    }
  }
}
