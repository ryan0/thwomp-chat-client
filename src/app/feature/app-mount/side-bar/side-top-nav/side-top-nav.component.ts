import {Component, inject} from '@angular/core';
import {MatMiniFabAnchor, MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {SideBarService} from "../side-bar.service";

@Component({
  selector: 'app-side-top-nav',
  standalone: true,
  imports: [
    MatMiniFabAnchor,
    MatTooltip,
    MatIcon,
    MatMiniFabButton
  ],
  templateUrl: './side-top-nav.component.html',
  styleUrl: './side-top-nav.component.css'
})
export class SideTopNavComponent {
  sideBarService = inject(SideBarService);


  public onHideSideBar() {
    this.sideBarService.hide()
  }

}
