import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {Item} from "../../model/item";
import {ItemService} from "../../services/item.service";
import {FormBuilder, FormGroup} from "@angular/forms";

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
  private item: Item = new Item();      //item that is selected for edit
  public start!:string;
  public end!:string;
  edititemForm!: FormGroup;
  public show!: boolean;

  constructor(private itemService: ItemService, private fb:FormBuilder) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));

    console.log('name: ' + decodedJWT.username);    // user that is logged in
    this.username = decodedJWT.username;

    this.itemService.getItems().subscribe(items => this.items = items);

    this.edititemForm = this.fb.group({
      id: [''],
      firstname: [''],
      lastname: [''],
      department: [''],
      email: [''],
      country: ['']
    } );

    this.show = false;

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
