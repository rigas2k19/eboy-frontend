import { Component, OnInit } from '@angular/core';
import {Message} from "../../model/message";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css']
})
export class ReceivedComponent implements OnInit {
  receivedMessages: Message[] = [];
  username!: string


  constructor(private messageservice: MessageService) {
  }

  ngOnInit(): void {

    let token = localStorage.getItem('token');
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));

    console.log('name: ' + decodedJWT.username);    // get username of user that is logged in
    this.username = decodedJWT.username;

    this.messageservice.getMessagesReceived(this.username).subscribe(receivedMessages => {
      this.receivedMessages = receivedMessages;
    });
  }
}
