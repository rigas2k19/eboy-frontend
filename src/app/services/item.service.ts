import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "../model/item";
import {User} from "../model/user";
import {Bid} from "../model/bid";


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsUrl = 'https://localhost:8443/items';
  private addBidUrl = 'https://localhost:8443/items/'
  private caturl = 'https://localhost:8443/items/categories'
  public globalItem: Item = new Item();

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]>{
    return this.http.get<Item[]>(this.itemsUrl);
  }

  getItem(itemId: number | null): Observable<Item>{
    return this.http.get<Item>(this.itemsUrl + '/' + itemId);
  }

  public addItem(item: Item): Observable<Item>{
    alert("added item: " + item.name);
    return this.http.post<Item>(this.itemsUrl + '/add', item,);
  }

  // Delete Item //
  public deleteItem(itemId: number): Observable<User>{
    return this.http.delete<User>(this.itemsUrl+"/"+itemId);
  }

  public editItem(item: Item): Observable<Item>{
    return this.http.put<Item>(this.itemsUrl+"/add/"+item.id, item,);
  }

  public storeItem(item:Item):void{
    this.globalItem = item;
    localStorage.setItem('itemId', JSON.stringify({id: this.globalItem.id}));
  }

  public getstoredItem(): number{
    const raw = JSON.parse(localStorage.getItem('itemId') || '{}');
    return Object(raw)["id"];
  }

  public addBid(bid:Bid,itemId:number):Observable<Bid>{
    console.log(bid);
    return this.http.post<Bid>(this.addBidUrl + (itemId.toString()) + "/bids", bid);
  }

  //get categories
  public getCategories():Observable<Object[]>{
    return this.http.get<Object[]>(this.caturl);
  }

}
