export interface InsuranceQuote {
  id: number;
  quoteNumber: string;
  lineOfBusiness: number;
}

export interface RecentQuote {
  [id:number]:InsuranceQuote[];
}

export interface MappedInsuranceQuote {
  id: number;
  quotes: InsuranceQuote[];
  name: string;
}
