import { Injectable } from '@angular/core';
import { InsuranceQuote } from './InsuranceQuote';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  tap,
} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class RecentQuoteService {
  private recentQuotesUrl = 'api/recentQuotes/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** Get recent quotes from server **/
  getRecentQuotes(): Observable<{ [id: number]: InsuranceQuote[] }> {
    return this.http.get<InsuranceQuote[]>(this.recentQuotesUrl).pipe(
      map((quoteObjects) => {
        const groupedQuotes: { [id: number]: InsuranceQuote[] } = {};
        quoteObjects.forEach((obj) => {
          if (!groupedQuotes[obj.lineOfBusiness]) {
            groupedQuotes[obj.lineOfBusiness] = [];
          }
          groupedQuotes[obj.lineOfBusiness].push(obj);
        });
        return groupedQuotes;
      }),
      tap(groupedQuotes => {this.log('fetched quotes')
        console.log('groupedQuotes', groupedQuotes);
      }),
      catchError(
        this.handleError<{ [id: number]: InsuranceQuote[] }>(
          'getRecentQuotes',
          {}
        )
      )
    );
  }

  /** GET recent quote by line of business id. returns 404 like LOB method if id not found */
  getQuotesByLineOfBusiness(id: number): Observable<InsuranceQuote[]> {
    const url = `${this.recentQuotesUrl}?lineOfBusiness=${id}`;
    return this.http.get<InsuranceQuote[]>(url).pipe(
      tap(_ => this.log(`fetched quotes for LOB lineOfBusiness=${id}`)),
      catchError(this.handleError<InsuranceQuote[]>(`getOuotes for LOB id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**Logging  **/
  private log(message: string) {
    this.messageService.add(`RecentQuoteService: ${message}`);
  }
}
