import { Component } from '@angular/core';
import { Theme } from 'src/app/theme';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css'],
})
export class MyCollectionsComponent {
  theme = Theme;
}
