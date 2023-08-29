import { Component, OnInit } from '@angular/core';
import { Individual } from 'src/app/components/individual/individual.component';
import { AppStateService } from 'src/app/services/app-state.service';
import { Theme } from 'src/app/theme';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-individual-detail',
  templateUrl: './individual-detail.component.html',
  styleUrls: ['./individual-detail.component.css'],
})
export class IndividualDetailComponent implements OnInit {
  theme = Theme;
  util = Util;

  individual: Individual | null = null;

  constructor(private appState: AppStateService) {}

  ngOnInit(): void {
    this.individual = this.appState.individual;
    console.log(this.individual);
  }
}
