import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {Item} from "../../model/item";
import {ItemService} from "../../services/item.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.css']
})
export class UserItemsComponent implements OnInit {
  public user: User = new User();
  public username !: string;
  public items: Item[] = [];
  public submitted = false;
  private item: Item = new Item();      //item that is selected for edit
  public start!:string;
  public end!:string;
  edititemForm!: FormGroup;
  public show!: boolean;

  constructor(private itemService: ItemService, private fb: FormBuilder) {
  }

  get form() {
    return this.edititemForm.controls;
  }

  get name() {
    return this.edititemForm.get('name');
  }

  get category() {
    return this.edititemForm.get('category');
  }

  get buy_price() {
    return this.edititemForm.get('buy_price');
  }

  get first_bid() {
    return this.edititemForm.get('first_bid');
  }

  get description() {
    return this.edititemForm.get('description');
  }

  get location() {
    return this.edititemForm.get('location');
  }

  get ends() {
    return this.startitemForm.get('ends');
  }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));

    console.log('name: ' + decodedJWT.username);    // user that is logged in
    this.username = decodedJWT.username;

    this.itemService.getItems().subscribe(items => this.items = items);

    this.show = false;

  }

  myInit(item: Item) {
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
      currently: item.currently,
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




