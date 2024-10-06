import {Component, inject} from '@angular/core';
import {MessagesService} from "./messages.service";
import {MessageComponent} from "../message/message.component";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    MessageComponent
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  private messagesService = inject(MessagesService);


  get messages () {
    return this.messagesService.getMessages();
  }

}
