import { Component, OnInit } from '@angular/core';
import {Message} from "../../model/message";
import {MessageService} from "../../services/message.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {
  sentMessages: Message[] = [];
  message!: Message;
  username!:string;
  messagePopUp: boolean = false;
  addMessageForm!: FormGroup;
  submitted:boolean = false;

  constructor(private messageservice: MessageService, private fb:FormBuilder) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));

    console.log('name: ' + decodedJWT.username);    // get username of user that is logged in
    this.username = decodedJWT.username;

    this.messageservice.getMessagesSent(this.username).subscribe(sentMessages => {
      this.sentMessages = sentMessages;
      console.log(this.sentMessages);
    });

    this.addMessageForm = this.fb.group({
      receiver: ['', [Validators.required]],
      messageText:['', [Validators.required]]
    });
  }

  get form(){return this.addMessageForm.controls;}
  get receiver(){return this.addMessageForm.get('receiver');}
  get messageText(){return this.addMessageForm.get('messageText');}

  showMessagePopUp(){
    this.messagePopUp = true;
  }

  sendMessage(){
    this.submitted = true;

    this.messageservice.addMessage({
      id:0,
      message: this.messageText!.value,
      senderUsername: this.username,
      receiverUsername:this.receiver!.value,
      isRead: false}).subscribe();
  }

  deleteMessage(id:number){
    console.log("deleting message with id " + id);
    this.messageservice.deleteMessage(id).subscribe(message=>this.message);
    location.reload();
  }

}
