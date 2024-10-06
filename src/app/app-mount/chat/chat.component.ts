import { Component } from '@angular/core';
import {SendMessageComponent} from "./send-message/send-message.component";
import {MessagesComponent} from "./messages/messages.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    SendMessageComponent,
    MessagesComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

}
