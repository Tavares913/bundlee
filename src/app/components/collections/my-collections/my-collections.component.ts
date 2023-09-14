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
      (data) => {
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

  listIndividuals(c: Collection) {
    const retval: string =
      c.individuals.length > 0
        ? c.individuals.reduce((acc, cur, i) => {
            if (i === c.individuals.length - 1) {
              return acc + cur.title;
            }
            return acc + cur.title + ', ';
          }, '')
        : 'Empty';
    return retval;
  }
}

export interface Collection {
  id: number;
  name: string;
  individuals: Individual[];
}
