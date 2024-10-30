import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Message, MessageNew} from "../message/message.model";
import {Subject} from "rxjs";
import {ChatService} from "../../side-bar/chat.service";


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private httpClient = inject(HttpClient);
  private chatsServiceService = inject(ChatService);

  private messages = new Map<number, Message[]>();
  private messageEmitter = new Subject<Message>();

  constructor() {
    console.log("message service inirt");

    this.chatsServiceService.listenActiveChatId().subscribe(chatId => {

      console.log("chatId", chatId);

      if (!this.messages.has(chatId)) {
        this.loadMessagesForChat(chatId);
      }
    });
  }

  public getMessages() {
    return this.messages.get(this.chatsServiceService.getActiveChatId());
  }

  public listenMessages() {
    return this.messageEmitter.asObservable();
  }

  public sendMessage(message: string) {
    let activeChatId = this.chatsServiceService.getActiveChatId();
    let url =  `/api/message/chat/${activeChatId}`
    let msg : MessageNew = {
      text: message,
      chatId: activeChatId,
    };

    this.httpClient.post<Message>(url, msg).subscribe({
      next: message => {
        this.addMessage(message)
      },
      error: err => {
        console.log(err);
      }
    });
  }

  private addMessage(message: Message){
    let activeChatId = this.chatsServiceService.getActiveChatId();
    this.messages.get(activeChatId)?.push(message);
    this.messageEmitter.next(message);
  }

  private loadMessagesForChat(chatId: number) {
    let url = `/api/message/chat/${chatId}`;
    this.httpClient.get<Message[]>(url).subscribe({
      next: response => {
        this.messages.set(chatId, response);
        if (response.length > 0) {
          this.messageEmitter.next(response[response.length - 1]);
        }
      },
      error: error => {
        console.log(error);
      }
    })
  }

}
