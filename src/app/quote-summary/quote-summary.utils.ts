import { InsuranceQuote, MappedInsuranceQuote, RecentQuote } from "../InsuranceQuote";
import { LineOfBusiness } from "../LineOfBusiness";

 // takes the already mapped array of quotes/LOBs and orders them by the size of the quotes array so popular items are first.
export const  sorttheArrayByQuoteLength = (unorderedArray: MappedInsuranceQuote[]) =>{
  console.log(unorderedArray)
    return unorderedArray.sort(
      (fistArray, secondArray) =>
        secondArray.quotes.length - fistArray.quotes.length
    );
  } 
  // does a join on the LOB id so that the name of the LOB is present and the corresponding quotes are attached to that LOB id
 export const  mapQuotesToBusiness = ( recentQuotes:RecentQuote,  linesOfBusiness:LineOfBusiness[]) :MappedInsuranceQuote[] => 
    sorttheArrayByQuoteLength(
      linesOfBusiness.map((business) => {
        return {
            id: business.id,

            quotes: recentQuotes[business.id] || [],
            name: business.name,
        } as unknown as MappedInsuranceQuote;
      })
    );
  
  