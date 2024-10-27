import { Routes } from '@angular/router';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {AppMountComponent} from "./app-mount/app-mount.component";
import {HomeComponent} from "./landing-page/home/home.component";
import {LoginComponent} from "./landing-page/login/login.component";

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
