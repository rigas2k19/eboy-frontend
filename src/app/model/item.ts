import {Time} from "@angular/common";

export class Item{
  id: number | undefined;
  name: string | undefined;
  category: string | undefined;
  currently: string | undefined; // string and cast myNumber: number = +myNumberString;
  buy_price: string | undefined;
  first_bid: string | undefined;
  number_of_bids: string | undefined;   //cast se int
  location: string | undefined;
  started : string | undefined;     //cast se datetime
  ends: string | undefined;         //cast se datetime
  sellerUsername: string | undefined;
  description: string | undefined;
}
