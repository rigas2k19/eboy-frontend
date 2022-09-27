import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../services/item.service";
import {Item} from "../../model/item";
import {Router} from "@angular/router";
import {MessageService} from "../../services/message.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-items-bought',
  templateUrl: './items-bought.component.html',
  styleUrls: ['./items-bought.component.css']
})
export class ItemsBoughtComponent implements OnInit {
  userBids: number[] = [];
  public itemsBought: Item[] = [];
  submitted: boolean = false;
  username!:string;
  addMessageForm!: FormGroup;
  messagePopUp:boolean = false;

  constructor( private messageService: MessageService, private itemService:ItemService, private router: Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.itemService.getUsersLastBids().subscribe(userBids => {
      this.userBids = userBids;
      for(let id in this.userBids){
        this.itemService.getItem(this.userBids[id]).subscribe(itemsBought => {
          this.itemsBought.push(itemsBought);
        })
      }
    });

    let token = localStorage.getItem('token');
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));

    console.log('name: ' + decodedJWT.username);    // get username of user that is logged in
    this.username = decodedJWT.username;


  }

  get form(){return this.addMessageForm.controls;}
  get receiver(){return this.addMessageForm.get('receiver');}
  get messageText(){return this.addMessageForm.get('messageText');}


  goToMessages():void{

    this.router.navigate(["/messages/sent"]);
  }

  showMessagePopUp(sellerUsername:string){
    this.addMessageForm = this.fb.group({
      receiver: [sellerUsername, [Validators.required]],
      messageText:['', [Validators.required]]
    });
    this.messagePopUp = true;
  }

  sendMessage(){
    this.submitted = true;

    this.messageService.addMessage({
      id:0,
      message: this.messageText!.value,
      senderUsername: this.username,
      receiverUsername:this.receiver!.value,
      isRead: false
    }).subscribe();

    this.router.navigate(["/messages/sent"]);
    location.reload();
  }
}
