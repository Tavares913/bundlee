import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Collection } from '../my-collections/my-collections.component';
import { Theme } from 'src/app/theme';
import { AppStateService } from 'src/app/services/app-state.service';
import { Subscription } from 'rxjs';
import { CollectionService } from 'src/app/services/collection.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css'],
})
export class CollectionDetailComponent implements OnInit, OnDestroy {
  theme = Theme;

  collection: Collection | undefined;
  favouritedCollections: Collection[] = [];
  favouritedCollectionsSubscription: Subscription = Subscription.EMPTY;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public injectedCollection: { collection: Collection },
    private appStateService: AppStateService,
    private collectionService: CollectionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.injectedCollection) {
      const injectedCollection = this.injectedCollection.collection;
      this.collection = injectedCollection;
    }
    this.favouritedCollectionsSubscription =
      this.appStateService.favouritedCollections.subscribe((data) => {
        this.favouritedCollections = data;
      });
  }

  ngOnDestroy(): void {
    this.favouritedCollectionsSubscription.unsubscribe();
  }

  isFavourited() {
    return this.favouritedCollections.find((c) => c.id === this.collection?.id);
  }

  favourite() {
    if (!this.collection?.id) return;
    this.collectionService.favouriteCollection(this.collection.id).subscribe(
      (data) => {
        this.collectionService.getFavouritedCollections().subscribe(
          (data) => {
            this.appStateService.setFavouritedCollections(data);
            this.collectionService
              .searchCollections(this.appStateService.searchCollectionsTerm)
              .subscribe(
                (data) => {
                  this.appStateService.setSearchedCollections(data);
                },
                (e) => {
                  this.snackBar.open(e.message, 'Close', { duration: 5000 });
                }
              );
          },
          (e) => {
            this.snackBar.open(e.message, 'Close', {
              duration: 5000,
            });
          }
        );
      },
      (e) => {
        this.snackBar.open(e.message, 'Close', {
          duration: 5000,
        });
      }
    );
  }

  unfavourite() {
    if (!this.collection?.id) return;
    this.collectionService.unfavouriteCollection(this.collection.id).subscribe(
      (data) => {
        this.collectionService.getFavouritedCollections().subscribe(
          (data) => {
            this.appStateService.setFavouritedCollections(data);
            this.collectionService
              .searchCollections(this.appStateService.searchCollectionsTerm)
              .subscribe(
                (data) => {
                  this.appStateService.setSearchedCollections(data);
                },
                (e) => {
                  this.snackBar.open(e.message, 'Close', { duration: 5000 });
                }
              );
          },
          (e) => {
            this.snackBar.open(e.message, 'Close', {
              duration: 5000,
            });
          }
        );
      },
      (e) => {
        this.snackBar.open(e.message, 'Close', {
          duration: 5000,
        });
      }
    );
  }
}
