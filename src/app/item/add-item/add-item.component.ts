import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../../services/item.service";
import {Item} from "../../model/item";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  item : Item = new Item()
  additemForm!: FormGroup
  submitted = false
  buy_price = 0;
  username!: string;

  constructor(private service: ItemService, private fb:FormBuilder) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));

    this.username = decodedJWT.username;

    this.additemForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      buyprice: [''],     //this has option to not exist.
      firstbid: ['', [Validators.required]],
     // start: ['', [Validators.required]],
     // finish: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
  }

  get form(){return this.additemForm.controls;}

  get name(){return this.additemForm.get('name');}
  get category(){return this.additemForm.get('category');}
  get buyprice(){return this.additemForm.get('buyprice');}
  get firstbid(){return this.additemForm.get('firstbid');}
  //get start(){return this.additemForm.get('start');}
 // get finish(){return this.additemForm.get('finish');}
  get description(){return this.additemForm.get('description');}
  get location(){return this.additemForm.get('location');}


  onSubmit(){
    this.submitted = true;

    if (this.additemForm.invalid) {
      return;
    }

    if(!this.buyprice == undefined){
      this.buy_price = this.buyprice!.value;
    }

    this.service.addItem({
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
      description:this.description!.value
    }).subscribe();

  }
}
