import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollectionService } from 'src/app/services/collection.service';
import { Theme } from 'src/app/theme';

@Component({
  selector: 'app-search-collections',
  templateUrl: './search-collections.component.html',
  styleUrls: ['./search-collections.component.css'],
})
export class SearchCollectionsComponent {
  theme = Theme;

  search = '';

  constructor(
    private collectionService: CollectionService,
    private snackBar: MatSnackBar
  ) {}

  searchCollection(config: { refresh: boolean }) {
    this.collectionService.searchCollections(this.search).subscribe(
      (data) => {
        console.log(data);
      },
      (e) => {
        this.snackBar.open(e.message, 'Close', { duration: 5000 });
      }
    );
  }
}
