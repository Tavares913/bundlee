import { Component } from '@angular/core';
import { Theme } from 'src/app/theme';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  colours = Theme.colours;
}
