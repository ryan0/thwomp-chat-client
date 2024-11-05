import {Component, inject} from '@angular/core';
import {SideBarComponent} from "./side-bar/side-bar.component";
import {ChatComponent} from "./chat/chat.component";
import {NgClass} from "@angular/common";
import {SideBarService} from "./side-bar/side-bar.service";

@Component({
  selector: 'app-app-mount',
  standalone: true,
  imports: [
    SideBarComponent,
    ChatComponent,
    NgClass
  ],
  templateUrl: './app-mount.component.html',
  styleUrl: './app-mount.component.css'
})
export class AppMountComponent {
  private sideBarService = inject(SideBarService);

  public sideBarVisible(): boolean {
    return this.sideBarService.isVisible();
  }

}
