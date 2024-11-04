import {Component, input} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {

  id = input.required<number>();
  text = input.required<string>();
  sender = input.required<string>();
  timestamp = input.required<Date>();

}
