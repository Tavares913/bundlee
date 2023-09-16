import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state.service';
import { CollectionService } from 'src/app/services/collection.service';
import { Collection } from './my-collections/my-collections.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
})
export class CollectionsComponent implements OnInit {
  constructor(
    private collectionService: CollectionService,
    private appStateService: AppStateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.collectionService.getFavouritedCollections().subscribe(
      (data: Collection[]) => {
        this.appStateService.setFavouritedCollections(data);
      },
      (e) => {
        this.snackBar.open(e.message, 'Close', {
          duration: 5000,
        });
      }
    );
  }
}
