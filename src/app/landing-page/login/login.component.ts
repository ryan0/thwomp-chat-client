import {Component, inject} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  public loginFailed = false;


  public onSubmit(username: string, password: string) {
    let auth = this.encodeCredentials(username, password);
    let headers = new HttpHeaders({
      'authorization': auth
    });

    this.httpClient.get('http://localhost:8080/user', {headers, responseType: 'text'}).subscribe({
      next: response => {
        console.log("Logged in!");
        sessionStorage.setItem('sessionAuth', auth);
        this.router.navigate(['/app'], {replaceUrl:true});
      },
      error: error => {
        console.log(error);
        this.loginFailed = true;
      }
    });
  }

  private encodeCredentials(username: string, password: string) {
    const encodedCredentials = btoa(`${username}:${password}`);
    return `Basic ${encodedCredentials}`;
  }

}
