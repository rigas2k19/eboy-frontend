import { Component, OnInit } from '@angular/core';
import {Message} from "../model/message";
import {MessageService} from "../services/message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  receivedMessages: Message[] = [];
  sentMessages: Message[] = [];
  username!: string

  constructor(private messageservice: MessageService, private router:Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));
    console.log('name: ' + decodedJWT.username);    // get username of user that is logged in
    this.username = decodedJWT.username;

    this.messageservice.getMessagesReceived(this.username).subscribe(receivedMessages => this.receivedMessages = receivedMessages);

    this.messageservice.getMessagesSent(this.username).subscribe(sentMessages => this.sentMessages = sentMessages);

  }

  goToSent(){
    this.router.navigate(['/messages/sent']);
  }

  goToReceived(){
    this.router.navigate(['/messages/received']).then(() => {
      window.location.reload();
    });
  }
}
