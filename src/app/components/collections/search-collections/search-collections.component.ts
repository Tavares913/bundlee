import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollectionService } from 'src/app/services/collection.service';
import { Theme } from 'src/app/theme';
import { Collection } from '../my-collections/my-collections.component';
import { Util } from 'src/app/util';
import { MatDialog } from '@angular/material/dialog';
import { CollectionDetailComponent } from '../collection-detail/collection-detail.component';

@Component({
  selector: 'app-search-collections',
  templateUrl: './search-collections.component.html',
  styleUrls: ['./search-collections.component.css'],
})
export class SearchCollectionsComponent implements OnInit {
  theme = Theme;
  util = Util;

  search = '';
  loading = false;
  searched = false;
  searchedCollections: Collection[] = [];
  searchedCollectionsTableColumns: string[] = ['name', 'user', 'individuals'];

  constructor(
    private collectionService: CollectionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.collectionService.searchCollections('').subscribe(
      (data) => {
        this.loading = false;
        this.searchedCollections = data;
      },
      (e) => {
        this.loading = false;
        this.snackBar.open(e.message, 'Close', { duration: 5000 });
      }
    );
  }

  searchCollection(config: { refresh: boolean }) {
    this.loading = true;
    this.searched = true;
    this.collectionService.searchCollections(this.search).subscribe(
      (data) => {
        this.loading = false;
        this.searchedCollections = data;
      },
      (e) => {
        this.loading = false;
        this.searched = true;
        this.snackBar.open(e.message, 'Close', { duration: 5000 });
      }
    );
  }

  openCollectionDialog(c: Collection) {
    this.dialog.open(CollectionDetailComponent, {
      data: {
        collection: c,
      },
    });
  }
}
