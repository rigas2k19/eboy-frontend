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
  message!: Message;


  constructor(private messageservice: MessageService) {
  }

  ngOnInit(): void {
    
    /*
    let token = localStorage.getItem('token');
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));

    console.log('name: ' + decodedJWT.username);    // get username of user that is logged in
    this.username = decodedJWT.username;
    */
    this.username = localStorage.getItem('username')!;

    this.messageservice.getMessagesReceived(this.username).subscribe(receivedMessages => {
      this.receivedMessages = receivedMessages;
      //edit each received Message to mark it read.
      for(let i=0; i<receivedMessages.length; i++){
        if(!(receivedMessages[i].isRead)){
          //if message is not read, mark it read.
          this.messageservice.editMessage({
            id: receivedMessages[i].id,
            message: receivedMessages[i].message,
            receiverUsername: receivedMessages[i].receiverUsername,
            senderUsername: receivedMessages[i].senderUsername,
            isRead: true,
          }).subscribe();
        }
      }
    });
  }

  deleteMessage(id:number){
    this.messageservice.deleteMessage(id).subscribe(message=>this.message);
    location.reload();
  }
}
