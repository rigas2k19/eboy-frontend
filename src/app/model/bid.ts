import {Item} from "./item";

export class Bid{
  id !: number;
  bidder !: string;
  time !: string;
  amount !: number;
  item !: Item;
}
