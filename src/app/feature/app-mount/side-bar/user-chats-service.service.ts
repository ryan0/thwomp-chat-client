import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Chat} from "../chat/chat.model";

@Injectable({
  providedIn: 'root'
})
export class UserChatsServiceService {

  private httpClient = inject(HttpClient);
  private chats : Chat[] = [];

  constructor() { }

  public getChats() {
      return this.chats;
  }

  public loadChats(): void {
    this.httpClient.get<Chat[]>('/api/chat').subscribe({
      next: response => {
        console.log(response);
        this.chats = response
      },
      error: error => {
        console.log(error);
        this.chats = [];
      }
    });
  }
}
