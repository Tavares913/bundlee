import { Component, OnInit, OnDestroy } from '@angular/core';
import { Collection } from '../my-collections/my-collections.component';
import { AppStateService } from 'src/app/services/app-state.service';
import { CollectionService } from 'src/app/services/collection.service';
import { Subscription } from 'rxjs';
import { Theme } from 'src/app/theme';

@Component({
  selector: 'app-favourited-collections',
  templateUrl: './favourited-collections.component.html',
  styleUrls: ['./favourited-collections.component.css'],
})
export class FavouritedCollectionsComponent implements OnInit, OnDestroy {
  theme = Theme;

  favouritedCollections: Collection[] = [];
  favouritedCollectionsSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private appStateService: AppStateService,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.collectionService.getFavouritedCollections().subscribe((data) => {
      this.appStateService.setFavouritedCollections(data);
    });
    this.favouritedCollectionsSubscription =
      this.appStateService.favouritedCollections.subscribe((data) => {
        this.favouritedCollections = data;
      });
  }
  ngOnDestroy(): void {
    this.favouritedCollectionsSubscription.unsubscribe();
  }
}
