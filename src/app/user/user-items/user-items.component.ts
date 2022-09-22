import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {Item} from "../../model/item";
import {ItemService} from "../../services/item.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";

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
  public item: Item = new Item();      //item that is selected for edit
  public start!: string;
  public end!: string;
  edititemForm!: FormGroup;
  startitemForm!: FormGroup;
  public show!: boolean;
  public startshow!: boolean;

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

  get country(){
    return this.edititemForm.get('country');
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
    this.startshow = false;

  }

  myInit(item: Item) {
    this.start = item.started!;
    this.end = item.ends!;
    this.submitted = true;
  }

  editAuction(item: Item) {
    this.submitted = true;
    this.show = false

    this.itemService.editItem({
      id: item.id,
      name: this.name!.value,
      category: this.category!.value,
      first_bid: this.first_bid!.value,
      buy_price: this.buy_price!.value,
      description: this.description!.value,
      number_of_bids: item.number_of_bids,
      location: this.location!.value,
      country:this.country!.value,
      sellerUsername: item.sellerUsername,
      currently: item.currently,
      started: item.started,
      ends: item.ends,
      auctionStarted: false,
      auctionEnds: false,
    }).subscribe();

    location.reload();
  }

  showEdit(item: Item) {
    console.log(item);
    this.edititemForm = this.fb.group({
      name: [item.name,],
      category: [item.category],
      buy_price: [item.buy_price],
      first_bid: [item.first_bid],
      location: [item.location],
      country: [item.country],
      description: [item.description]
    });


    this.show = true;
    this.item = item;
  }

  showStart(item: Item) {
    console.log(item);
    this.startitemForm = this.fb.group({
        ends: [item.ends, [Validators.required]]
      }, {validator: Valid_date('ends')}
    );

    this.startshow = true;
    this.item = item;
  }

  startAuction(item: Item) {
    let dateTime = new Date();
    this.submitted = true;
    this.itemService.editItem({
      id: item.id,
      name: item.name,
      category: item.category,
      first_bid: item.first_bid,
      buy_price: item.buy_price,
      description: item.description,
      number_of_bids: item.number_of_bids,
      location: item.location,
      country:item.country,
      sellerUsername: item.sellerUsername,
      currently: item.currently,
      started: dateTime as unknown as string,
      ends: this.ends!.value,
      auctionStarted: true,
      auctionEnds: false,
    }).subscribe();

    this.startshow = false;

    location.reload();
  }

  deleteItem(item: Item) {
    this.itemService.deleteItem(item.id!).subscribe(item=>this.item);
    location.reload();
  }
}

function Valid_date(controlName: string) {
  //check if date is valid
  const date = new Date();

  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    let form_date = new Date(control.value);
    if(form_date < date){
      console.log("invalid");
      console.log(form_date);
      console.log(date);
      control.setErrors({ Valid_date: true });
    } else {
      console.log("valid");
      control.setErrors(null);
    }
  }
}


