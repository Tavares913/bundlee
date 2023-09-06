import { Component } from '@angular/core';
import { Theme } from 'src/app/theme';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  theme = Theme;
  username: string = '';
  password: string = '';

  submitLogin() {
    console.log(this.username, this.password);
  }
}
