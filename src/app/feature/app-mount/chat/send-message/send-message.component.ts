import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MessagesService} from "../messages/messages.service";
import {Message} from "../message/message.model";

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
  text = ''
  private messagesService = inject(MessagesService);

  public sendMessage() {
    if (this.text === '') {
      return;
    }

    const message: Message = {
      id: Math.random() + "",
      text: this.text
    }
    this.messagesService.addMessage(message);
    this.text = '';
  }

}
