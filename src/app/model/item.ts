import {Bid} from "./bid";

export class Item{
  id: number | undefined;
  name: string | undefined;
  category: string | undefined;
  currently: number | undefined; // string and cast myNumber: number = +myNumberString;
  buy_price: number | undefined;
  first_bid: number | undefined;
  number_of_bids: number | undefined;   //cast se int
  location: string | undefined;
  country: string |undefined;
  started : string | undefined;     //cast se datetime
  ends: string | undefined;         //cast se datetime
  sellerUsername: string | undefined;
  description: string | undefined;
  auctionStarted: boolean | undefined; // gia to add
  auctionEnds: boolean | undefined;
}
