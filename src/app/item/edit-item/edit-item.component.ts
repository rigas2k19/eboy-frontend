import { Component,Input, OnInit } from '@angular/core';
import {Item} from "../../model/item";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  item : Item = new Item();
  edititemForm!: FormGroup;
  submitted = false;
  buy_price = 0;
  username!: string;


  constructor(private service: ItemService, private fb:FormBuilder) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));

    this.username = decodedJWT.username;

    this.edititemForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      buyprice: [''],     //this has option to not exist.
      firstbid: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
  }

//<3 <33333

  get form(){return this.edititemForm.controls;}

  get name(){return this.edititemForm.get('name');}
  get category(){return this.edititemForm.get('category');}
  get buyprice(){return this.edititemForm.get('buyprice');}
  get firstbid(){return this.edititemForm.get('firstbid');}
  get description(){return this.edititemForm.get('description');}
  get location(){return this.edititemForm.get('location');}

  onSubmit(){
    this.submitted = true;

    if (this.edititemForm.invalid) {
      return;
    }

    if(!this.buyprice == undefined){
      this.buy_price = this.buyprice!.value;
    }

    this.service.editItem({
      id:0,
      name:this.name!.value,
      category: this.category!.value,
      currently:0,
      buy_price:this.buy_price,
      first_bid:this.firstbid!.value,
      number_of_bids:0,
      location:this.location!.value,
      started:"0001-01-01T00:00:00",
      ends:"0001-01-01T00:00:00",
      sellerUsername:this.username,
      description:this.description!.value,
      auctionStarted: false
    }).subscribe();
  }


}
