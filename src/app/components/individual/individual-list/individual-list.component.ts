import { Component, Input } from '@angular/core';
import { Individual } from '../individual.component';
import { Theme } from 'src/app/theme';
import { Util } from 'src/app/util';
import { AppStateService } from 'src/app/services/app-state.service';
import { MatDialog } from '@angular/material/dialog';
import { IndividualDetailComponent } from 'src/app/individual/individual-detail/individual-detail.component';

@Component({
  selector: 'app-individual-list',
  templateUrl: './individual-list.component.html',
  styleUrls: ['./individual-list.component.css'],
})
export class IndividualListComponent {
  theme = Theme;
  util = Util;

  @Input() individuals: Individual[] = [];
  @Input() searched: boolean = false;
  @Input() loading: boolean = false;

  constructor(private appState: AppStateService, private dialog: MatDialog) {}

  navigateToIndividual(individual: Individual) {
    this.appState.setIndividual(individual);
    this.dialog.open(IndividualDetailComponent);
  }
}
