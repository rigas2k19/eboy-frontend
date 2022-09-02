import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {Item} from "../../model/item";
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.css']
})
export class UserItemsComponent implements OnInit {
  public user: User = new User();
  public username !:string;
  public items: Item[] = [];
  public submitted = false;

  public start!:string;
  public end!:string;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));

    console.log('name: ' + decodedJWT.username);    // user that is logged in
    this.username = decodedJWT.username;

    this.itemService.getItems().subscribe(items => this.items = items);
  }

  myInit(item : Item){
    this.start = item.started!;
    this.end = item.ends!;
    this.submitted = true;
  }

  startAuction(item : Item){
    this.submitted = true;
    this.itemService.editItem({
      id: item.id,
      name: item.name,
      category:item.category,
      first_bid:item.first_bid,
      buy_price: item.buy_price,
      description: item.description,
      number_of_bids: item.number_of_bids,
      location: item.location,
      sellerUsername: item.sellerUsername,
      currently:item.currently,
      started: item.started,
      ends: item.ends,
      auctionStarted: true
    }).subscribe();
  }

  editAuction(item : Item){
    this.submitted = true;
    this.itemService.editItem({
      id: item.id,
      name: item.name,
      category:item.category,
      first_bid:item.first_bid,
      buy_price: item.buy_price,
      description: item.description,
      number_of_bids: item.number_of_bids,
      location: item.location,
      sellerUsername: item.sellerUsername,
      currently:item.currently,
      started: item.started,
      ends: item.ends,
      auctionStarted: false
    }).subscribe();
  }

  showEdit(){
    this.show = true;
  }

  openEdit(item: Item) {
    this.edititemForm.patchValue( {
      id: item.id,
      name: item.name,
      category:item.category,
      first_bid:item.first_bid,
      buy_price: item.buy_price,
      description: item.description,
      number_of_bids: item.number_of_bids,
      location: item.location,
      sellerUsername: item.sellerUsername,
      currently:item.currently,
      started: item.started,
      ends: item.ends,
      auctionStarted: false
    });
  }



}
