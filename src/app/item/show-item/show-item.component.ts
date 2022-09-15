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
  showConfirmation : boolean = false;
  username!:string;

  constructor(private itemservice : ItemService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.itemId = this.itemservice.getstoredItem();
    this.itemservice.getItem(this.itemId).subscribe(item => this.item = item );
    let token = localStorage.getItem('token');
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));

    console.log('name: ' + decodedJWT.username);    // get username of user that is logged in he is the one placing the bid
    this.username = decodedJWT.username;

    console.log(this.itemId);
  }

  get bid() {
    return this.BidForm.get('bid');
  }

  placeBid(){
    let dateTime = new Date();
    this.submitted = true;

    if (this.BidForm.invalid) {
     //return;
    }

    if(confirm('Do you really want to place this bid ?')){
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
        currently: this.bid!.value,     //change current value to last bid.
        started: this.item.started,
        ends: this.item.ends,
        auctionStarted: true,
        auctionEnds:false,
      }).subscribe();

      this.itemservice.addBid({
        id:0,
        bidder:this.username,
        time: (dateTime as unknown as string),
        amount: this.bid!.value,
        item: this.item
      }, this.item.id! ).subscribe();
    }

    this.showbidform = false;
    this.showConfirmation = false;

    location.reload();
  }

  showBidForm(): void{
    this.showbidform = true;
    this.BidForm = this.fb.group({
        bid: ['', [Validators.required]]
      }, {validator: Valid_price('bid', this.item)}
    );
  }

  showConfirm():void{
    this.showConfirmation = true;
  }

  buyNow(){
    if(confirm('Do you really want to buy this item for' + this.item.buy_price + '$ ?')){
      let dateTime = new Date();

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
        currently: this.item.buy_price!,     //change current value to last bid.
        started: this.item.started,
        ends: this.item.ends,
        auctionStarted: true,
        auctionEnds: true,
      }).subscribe();

      this.itemservice.addBid({
        id:0,
        bidder:this.username,
        time: (dateTime as unknown as string),
        amount: this.item.buy_price!,
        item: this.item
      }, this.item.id! ).subscribe();
    }

    location.reload();
  }

}



function Valid_price(controlName: string, item : Item){
  //check if bid price is valid
  let bid = Number(controlName);
  return(formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if(item.currently === 0){
      //this is the first bid
      if(bid >= (item.first_bid!)) {    //check if bid is greater or equal to first bid
        //valid bid
        control.setErrors(null);
      }else{
        //invalid bid
        control.setErrors({ Valid_date: true });
      }
    }else{
      //this is not the first bid
      if(bid > item.currently!){     //check if bid is greater to current bid
        control.setErrors(null);
      }else{
        //invalid bid
        control.setErrors({ Valid_date: true });
      }
    }
  }
}
