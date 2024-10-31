import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Chat} from "../chat/chat.model";
import {catchError, Observable, of, Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private httpClient = inject(HttpClient);

  private chats : Chat[] = [];
  private activeChatId = 0;
  private activeChatIdEmitter = new Subject<number>();

  constructor() { }

  public getActiveChatId(): number {
    return this.activeChatId;
  }

  public listenActiveChatId(): Observable<number> {
    return this.activeChatIdEmitter.asObservable();
  }

  public switchChat(chatId: number) {
    console.log("switchChat");
    this.activeChatId = chatId;
    this.activeChatIdEmitter.next(chatId);
  }

  public getChats() {
      return this.chats;
  }

  public loadChats(): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>('/api/chat').pipe(
      tap((response: Chat[]) => {
        this.chats = response;
      }),
      catchError(error => {
        console.log(error);
        this.chats = [];
        return of([]);
      })
    );
  }
}
