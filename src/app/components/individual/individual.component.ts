import { Component } from '@angular/core';
import { Theme } from 'src/app/theme';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css'],
})
export class IndividualComponent {
  theme = Theme;
  util = Util;
  search: string = '';
  media: string[] = ['anime', 'manga / ln', 'games', 'movies', 'tv shows'];

  searchIndividual() {
    console.log(this.search);
  }
}
