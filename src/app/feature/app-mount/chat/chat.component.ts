import { Component } from '@angular/core';
import {SendMessageComponent} from "./send-message/send-message.component";
import {MessagesComponent} from "./messages/messages.component";
import {TopNavComponent} from "./top-nav/top-nav.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    SendMessageComponent,
    MessagesComponent,
    TopNavComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

}
