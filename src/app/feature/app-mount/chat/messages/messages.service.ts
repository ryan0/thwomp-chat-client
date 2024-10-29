import {inject, Injectable} from '@angular/core';
import {Message} from "../message/message.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private httpClient = inject(HttpClient);

  private messages: Message[] = [
    {
      id: '1',
      text: 'Hello',
    },
    {
      id: '2',
      text: 'Hi',
    },
    {
      id: '3',
      text: 'wassup?',
    },
    {
      id: '4',
      text: 'notMuch',
    }
  ];

  public getMessages(): readonly Message[] {
    return this.messages;
  }

  public addMessage(message: Message) {
    this.messages.push(message);
  }

}