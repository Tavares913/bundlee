import { Component } from '@angular/core';
import { Theme } from 'src/app/theme';

@Component({
  selector: 'app-search-collections',
  templateUrl: './search-collections.component.html',
  styleUrls: ['./search-collections.component.css'],
})
export class SearchCollectionsComponent {
  theme = Theme;

  search = '';

  searchCollection(config: { refresh: boolean }) {
    console.log(this.search);
  }
}
