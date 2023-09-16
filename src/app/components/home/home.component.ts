import { Component } from '@angular/core';
import { Theme } from 'src/app/theme';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  theme = Theme;
}
