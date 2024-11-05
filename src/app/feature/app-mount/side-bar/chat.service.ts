import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Chat} from "../chat/chat.model";
import {AsyncSubject, BehaviorSubject, catchError, forkJoin, Observable, of} from "rxjs";
import {WebSocketService} from "../../../core/websocket.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private httpClient = inject(HttpClient);
  private webSocketService = inject(WebSocketService);

  private chats : Chat[] = [];
  private chatsLoaded$ = new AsyncSubject<boolean>()
  private activeChatId$ = new BehaviorSubject<number | undefined>(undefined);

  constructor() {
    forkJoin({
        loadedChats: this.loadChats(),
        wsConnected: this.webSocketService.connected()
    }).subscribe(({loadedChats, wsConnected}) => {
      this.handleChatResponse(loadedChats);
      this.handleWsConnection(wsConnected);
    });
  }

  public getChats(): ReadonlyArray<Chat> {
    return this.chats;
  }

  public getActiveChatId(): number | undefined {
    return this.activeChatId$.getValue();
  }

  public getActiveChatName(): string {
    let id = this.getActiveChatId();
    if (id === undefined) {
      return '';
    } else {
      return this.chats
        .find(chat => chat.id === id)
        ?.name || '';
    }
  }

  public listenActiveChatId(): Observable<number | undefined> {
    return this.activeChatId$.asObservable();
  }

  public switchChat(chatId: number) {
    this.activeChatId$.next(chatId);
  }

  public listenChatsLoaded(): Observable<boolean> {
    return this.chatsLoaded$.asObservable();
  }

  private loadChats(): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>('/api/chat').pipe(
      catchError(error => {
        console.log(error);
        return of([]);
      })
    );
  }

  private handleChatResponse(chats: Chat[]) {
    this.chats = chats;
    this.chatsLoaded$.next(true);
    this.chatsLoaded$.complete();

    if (this.chats && this.chats.length > 0) {
      this.activeChatId$.next(this.chats[0].id);
    } else {
      this.activeChatId$.next(undefined);
    }
  }

  private handleWsConnection(connected: boolean) {
    if (connected) {
      for (const chat of this.chats) {
        this.webSocketService.subscribeToTopic("/topic/message/chat/" + chat.id);
      }
    }
  }
}
