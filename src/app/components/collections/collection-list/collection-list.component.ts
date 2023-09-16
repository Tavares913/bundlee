import { Component, Input } from '@angular/core';
import { Collection } from '../my-collections/my-collections.component';
import { Util } from 'src/app/util';
import { MatDialog } from '@angular/material/dialog';
import { CollectionDetailComponent } from '../collection-detail/collection-detail.component';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css'],
})
export class CollectionListComponent {
  util = Util;

  @Input() collections: Collection[] = [];
  collectionsTableColumns: string[] = [
    'name',
    'user',
    'individuals',
    'favourites',
  ];

  constructor(private dialog: MatDialog) {}

  openCollectionDialog(c: Collection) {
    this.dialog.open(CollectionDetailComponent, {
      data: {
        collection: c,
      },
    });
  }
}
