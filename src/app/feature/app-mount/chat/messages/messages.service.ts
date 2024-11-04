import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Message, MessageNew} from "../message/message.model";
import {Observable, Subject} from "rxjs";
import {ChatService} from "../../side-bar/chat.service";
import {WebSocketService} from "../../../../core/websocket.service";
import {IMessage} from "@stomp/stompjs";


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private httpClient = inject(HttpClient);
  private webSocketService= inject(WebSocketService);
  private chatService = inject(ChatService);

  private messages = new Map<number, Message[]>();
  private newMessage$ = new Subject<Message>();
  private messagesLoaded$ = new Subject<number>();


  constructor() {
    this.chatService.listenChatsLoaded().subscribe(() => {
      for (const chat of this.chatService.getChats()) {
        const topic = `/topic/message/chat/${chat.id}`;
        this.webSocketService.listenImessage(topic)
          .subscribe(this.onReceiveWsMessage.bind(this));
      }
    });

    this.chatService.listenActiveChatId().subscribe(chatId => {
      if (chatId && !this.messages.has(chatId)) {
        this.loadMessagesForChat(chatId);
      }
    });
  }

  public getMessages() {
    const chatId = this.chatService.getActiveChatId();
    return chatId ? this.messages.get(chatId) : undefined;
  }

  public listenNewMessage() {
    return this.newMessage$.asObservable();
  }

  public listenMessagesLoadedForChat() {
    return this.messagesLoaded$.asObservable();
  }

  public sendMessage(message: string) {
    let activeChatId = this.chatService.getActiveChatId();
    if(!activeChatId) {
      return;
    }

    let topic =  `/ws/message/chat/${activeChatId}`
    let msg : MessageNew = {
      text: message,
      chatId: activeChatId,
    };
    this.webSocketService.send(topic, msg);
  }

  private onReceiveWsMessage(iMsg: IMessage) {
    const msg: Message = JSON.parse(iMsg.body);
    this.messages.get(msg.chatId)?.push(msg);
    this.newMessage$.next(msg);
  }

  private loadMessagesForChat(chatId: number) {
    let url = `/api/message/chat/${chatId}`;
    this.httpClient.get<Message[]>(url).subscribe({
      next: response => {
        this.messages.set(chatId, response);
        this.messagesLoaded$.next(chatId);
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
