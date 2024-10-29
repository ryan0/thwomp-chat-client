import {Component, inject, OnInit} from '@angular/core';
import {UserChatsServiceService} from "./user-chats-service.service";
import {Chat} from "../chat/chat.model";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {

  private userChatService = inject(UserChatsServiceService);

  ngOnInit(): void {
    this.userChatService.loadChats();
  }


  public chats() {
    return this.userChatService.getChats();
  }

  public onSelectChat(chat: Chat) {
    console.log(chat);
  }

}
