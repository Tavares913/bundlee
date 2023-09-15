import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Collection } from '../my-collections/my-collections.component';
import { Theme } from 'src/app/theme';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css'],
})
export class CollectionDetailComponent implements OnInit {
  theme = Theme;

  collection: Collection | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public injectedCollection: { collection: Collection }
  ) {}

  ngOnInit(): void {
    if (this.injectedCollection) {
      const injectedCollection = this.injectedCollection.collection;
      this.collection = injectedCollection;
    }
  }

  favourite() {}
}
