import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollectionService } from 'src/app/services/collection.service';
import { Theme } from 'src/app/theme';
import { Collection } from '../my-collections/my-collections.component';
import { Util } from 'src/app/util';
import { MatDialog } from '@angular/material/dialog';
import { CollectionDetailComponent } from '../collection-detail/collection-detail.component';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
  selector: 'app-search-collections',
  templateUrl: './search-collections.component.html',
  styleUrls: ['./search-collections.component.css'],
})
export class SearchCollectionsComponent implements OnInit, OnDestroy {
  theme = Theme;
  util = Util;

  search = '';
  loading = false;
  searched = false;
  searchedCollections: Collection[] = [];
  searchedCollectionsSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private collectionService: CollectionService,
    private appStateService: AppStateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.searchedCollectionsSubscription =
      this.appStateService.searchedCollections.subscribe((data) => {
        this.searchedCollections = data;
      });
    this.collectionService.searchCollections('').subscribe(
      (data) => {
        this.loading = false;
        this.appStateService.setSearchedCollections(data);
        this.appStateService.searchCollectionsTerm = '';
      },
      (e) => {
        this.loading = false;
        this.snackBar.open(e.message, 'Close', { duration: 5000 });
      }
    );
  }
  ngOnDestroy(): void {
    this.searchedCollectionsSubscription.unsubscribe();
  }

  searchCollection(config: { refresh: boolean }) {
    this.loading = true;
    this.searched = true;
    this.collectionService.searchCollections(this.search).subscribe(
      (data) => {
        this.loading = false;
        this.appStateService.setSearchedCollections(data);
        this.appStateService.searchCollectionsTerm = this.search;
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
