import {AfterViewChecked, Component, inject, OnInit, ViewContainerRef} from '@angular/core';
import {MessageComponent} from "../message/message.component";
import {MessagesService} from "./messages.service";
import {ChatService} from "../../side-bar/chat.service";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    MessageComponent
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit, AfterViewChecked {
  private messageService = inject(MessagesService);
  private chatService = inject(ChatService);

  private shouldScrollToBottom = false;

  constructor(private messagesView: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.chatService.listenActiveChatId().subscribe({
      next: () => {
        this.shouldScrollToBottom = true;
      }
    });

    this.messageService.listenMessages().subscribe({
      next: (msg) => {
        if (msg.chatId === this.chatService.getActiveChatId()) {
          this.shouldScrollToBottom = true;
        }
      }
    })
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  get messages () {
    return this.messageService.getMessages();
  }

  private scrollToBottom(): void {
    try {
      this.messagesView.element.nativeElement.scrollTop = this.messagesView.element.nativeElement.scrollHeight;
    } catch(err) {

    }
  }

}
