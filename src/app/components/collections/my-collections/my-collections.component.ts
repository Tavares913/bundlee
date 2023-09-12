import { Component, OnInit, OnDestroy } from '@angular/core';
import { Theme } from 'src/app/theme';
import { Individual } from '../../individual/individual.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditCollectionComponent } from '../create-edit-collection/create-edit-collection.component';
import { AppStateService } from 'src/app/services/app-state.service';
import { Subscription } from 'rxjs';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css'],
})
export class MyCollectionsComponent implements OnInit, OnDestroy {
  theme = Theme;

  collections: Collection[] = [];
  collectionsSubcription: Subscription = Subscription.EMPTY;

  constructor(
    private dialog: MatDialog,
    private appStateService: AppStateService,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.collectionService.getCollections().subscribe((data: Collection[]) => {
      this.appStateService.setCollections(data);
    });
    this.collectionsSubcription = this.appStateService.collections.subscribe(
      (data) => {
        this.collections = data;
      }
    );
  }
  ngOnDestroy(): void {
    this.collectionsSubcription.unsubscribe();
  }

  openCreateDialog() {
    this.dialog.open(CreateEditCollectionComponent);
  }
}

export interface Collection {
  id: string;
  name: string;
  individuals: Individual[];
}
