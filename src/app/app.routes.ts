import { Routes } from '@angular/router';
import {LandingPageComponent} from "./feature/landing-page/landing-page.component";
import {AppMountComponent} from "./feature/app-mount/app-mount.component";
import {HomeComponent} from "./feature/landing-page/home/home.component";
import {LoginComponent} from "./feature/landing-page/login/login.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'app',
    component: AppMountComponent
  }
];
