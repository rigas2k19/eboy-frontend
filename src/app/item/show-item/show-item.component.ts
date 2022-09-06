import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../model/item";
import {Bid} from "../../model/bid";
import {ItemService} from "../../services/item.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-show',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css']
})
export class ShowItemComponent implements OnInit {
  public item:Item = new Item();
  public itemId!:number;
  showbidform:boolean = false;
  submitted:boolean = false;
  BidForm!: FormGroup;

  constructor(private itemservice : ItemService, private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.itemId = this.itemservice.getstoredItem();
    this.itemservice.getItem(this.itemId).subscribe(item => this.item = item );
    console.log(this.itemId);

  }

  get bid() {
    return this.BidForm.get('bid');
  }



  placeBid(){
    this.submitted = true;
    this.itemservice.addBid({id:0, bidder:"token", item: this.item, amount: this.bid!.value, time: ""})
    this.itemservice.editItem({
      id: this.item.id,
      name: this.item.name,
      category: this.item.category,
      first_bid: this.item.first_bid,
      buy_price: this.item.buy_price,
      description: this.item.description,
      number_of_bids: (this.item.number_of_bids)! + 1,
      location: this.item.location,
      sellerUsername: this.item.sellerUsername,
      currently: this.item.currently,
      started: this.item.started,
      ends: this.item.ends,
      auctionStarted: true,
    }).subscribe();

    this.showbidform = false;

  }

  showBidForm(): void{
    this.showbidform = true;
    this.BidForm = this.fb.group({
        bid: ['', [Validators.required]]
      }, {validator: Valid_price()}
    );
  }
}

function Valid_price(){
  //check if bid price is valid
}
