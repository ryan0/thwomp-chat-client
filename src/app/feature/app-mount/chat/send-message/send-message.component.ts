import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Message} from "../message/message.model";
import {MessagesService} from "../messages/messages.service";

@Component({
  selector: 'app-send-message',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.css'
})
export class SendMessageComponent {

  private chatMessagesService = inject(MessagesService);

  text = ''

  public sendMessage() {
    if (this.text === '') {
      return;
    }
    this.chatMessagesService.sendMessage(this.text)
    this.text = '';
  }

}
