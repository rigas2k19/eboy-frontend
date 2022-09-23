import { Component, OnInit } from '@angular/core';
import {Message} from "../../model/message";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {
  sentMessages: Message[] = [];
  message!: Message;
  username!:string;

  constructor(private messageservice: MessageService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));

    console.log('name: ' + decodedJWT.username);    // get username of user that is logged in
    this.username = decodedJWT.username;

    this.messageservice.getMessagesSent(this.username).subscribe(sentMessages => {
      this.sentMessages = sentMessages;
      console.log(this.sentMessages);
    });
  }

}
