import { Component, Input } from '@angular/core';
import { Individual } from '../individual.component';
import { Theme } from 'src/app/theme';

@Component({
  selector: 'app-individual-list',
  templateUrl: './individual-list.component.html',
  styleUrls: ['./individual-list.component.css'],
})
export class IndividualListComponent {
  theme = Theme;

  @Input() individuals: Individual[] = [];
  @Input() searched: boolean = false;
}
