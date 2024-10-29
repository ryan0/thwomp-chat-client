import {Component, inject, OnInit} from '@angular/core';
import {ChatService} from "./chat.service";
import {Chat} from "../chat/chat.model";
import {MessagesService} from "../chat/messages/messages.service";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {

  private chatService = inject(ChatService);

  ngOnInit(): void {
    this.chatService.loadChats().subscribe({
      next: chats => {
        if (chats.length >= 1) {
          let chatId= chats[0].id;
          this.chatService.switchChat(chatId);
        }
      }
    });

    if (this.chatService.getChats().length > 0) {

    }
  }


  public chats() {
    return this.chatService.getChats();
  }

  public onSelectChat(chat: Chat) {
    this.chatService.switchChat(chat.id);
  }

}
