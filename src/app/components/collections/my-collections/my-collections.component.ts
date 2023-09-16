import { Component, OnInit, OnDestroy } from '@angular/core';
import { Theme } from 'src/app/theme';
import { Individual } from '../../individual/individual.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditCollectionComponent } from '../create-edit-collection/create-edit-collection.component';
import { AppStateService } from 'src/app/services/app-state.service';
import { Subscription } from 'rxjs';
import { CollectionService } from 'src/app/services/collection.service';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css'],
})
export class MyCollectionsComponent implements OnInit, OnDestroy {
  theme = Theme;
  util = Util;

  collections: Collection[] = [];
  collectionsSubcription: Subscription = Subscription.EMPTY;
  collectionTableColumns: string[] = ['name', 'individuals'];

  constructor(
    private dialog: MatDialog,
    private appStateService: AppStateService,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.collectionService
      .getUserCollections()
      .subscribe((data: Collection[]) => {
        this.appStateService.setCollections(data);
      });
    this.collectionsSubcription = this.appStateService.collections.subscribe(
      (data: any) => {
        this.collections = data;
      }
    );
  }
  ngOnDestroy(): void {
    this.collectionsSubcription.unsubscribe();
  }

  openCreateEditDialog(c: Collection) {
    this.dialog.open(CreateEditCollectionComponent, {
      data: {
        collection: c,
      },
    });
  }
}

export interface Collection {
  id: number;
  name: string;
  individuals: Individual[];
}
