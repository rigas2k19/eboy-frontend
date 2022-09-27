import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {MessageService} from "./services/message.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'eboy-frontend';
  incoming!:number;
  constructor(public authService: AuthenticationService, public messageService: MessageService){ }

  ngOnInit() {
    this.getNumberOfIncoming().subscribe(incoming => {
      this.incoming = incoming
    });
  }

  logout(){
    this.authService.logout();
  }

  getNumberOfIncoming(){
    let username:string;
    username = localStorage.getItem('username')!;
    return this.messageService.getNumberOfIncoming(username);
  }
}

//geiaaaa
