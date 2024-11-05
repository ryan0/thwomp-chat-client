import {Component, inject} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabAnchor} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {SideBarService} from "../../side-bar/side-bar.service";
import {NgClass} from "@angular/common";
import {ChatService} from "../../side-bar/chat.service";

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabAnchor,
    MatTooltip,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    NgClass
  ],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent {
  private chatService = inject(ChatService);
  private sideBarService = inject(SideBarService);
  public logoutUrl = environment.logoutUrl;

  public isSideBarVisible(): boolean {
    return this.sideBarService.isVisible();
  }

  public onShowSideBar() {
    this.sideBarService.show();
  }

  public getChatName(): string {
    return this.chatService.getActiveChatName();
  }

}
