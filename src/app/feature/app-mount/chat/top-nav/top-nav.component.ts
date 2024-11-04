import { Component } from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent {
  public logoutUrl = environment.logoutUrl;

}
