import { Component } from '@angular/core';
import {SideBarComponent} from "./side-bar/side-bar.component";
import {ChatComponent} from "./chat/chat.component";

@Component({
  selector: 'app-app-mount',
  standalone: true,
  imports: [
    SideBarComponent,
    ChatComponent
  ],
  templateUrl: './app-mount.component.html',
  styleUrl: './app-mount.component.css'
})
export class AppMountComponent {

}
