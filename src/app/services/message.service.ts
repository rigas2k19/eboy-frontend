import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Message} from "../model/message";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageUrl = 'https://localhost:8443/messages';

  constructor(private http: HttpClient) { }

  public addMessage(message: Message): Observable<Message>{
    alert("added item: " + message.message);
    return this.http.post<Message>(this.messageUrl, message,);
  }

  public deleteMessage(messageId: number): Observable<Message>{
    return this.http.delete<Message>(this.messageUrl+"/"+messageId);
  }

  getMessagesReceived(username: string): Observable<Message[]>{
    return this.http.get<Message[]>(this.messageUrl + "/received/" + username);
  }

  getMessagesSent(username: string): Observable<Message[]>{
    return this.http.get<Message[]>(this.messageUrl + "/sent/" + username);
  }

  getMessagesSentBy(sender: string, receiver: string): Observable<Message[]>{
    return this.http.get<Message[]>(this.messageUrl + "/" + sender + "/" + receiver);
  }

// /messages/unread/{username}
  getNumberOfIncoming(username: string): Observable<number>{
    return this.http.get<number>(this.messageUrl + "/unread/" + username);
  }

  editMessage(message: Message): Observable<Message>{
    return this.http.put<Message>(this.messageUrl + "/received/" + message.id, message);
  }

}
