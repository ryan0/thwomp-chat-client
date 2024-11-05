import {Component, inject} from '@angular/core';
import {ChatService} from "./chat.service";
import {Chat} from "../chat/chat.model";
import {SideTopNavComponent} from "./side-top-nav/side-top-nav.component";
import {SideBarService} from "./side-bar.service";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    SideTopNavComponent
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent{
  private chatService = inject(ChatService);
  private sideBarService = inject(SideBarService);

  public chats() {
    return this.chatService.getChats();
  }

  public onSelectChat(chat: Chat) {
    this.chatService.switchChat(chat.id);

    console.log(window.innerWidth);
    if (window.innerWidth <= 768) {
      this.sideBarService.hide();
    }
  }
}
