import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Collection } from '../my-collections/my-collections.component';
import { CollectionService } from 'src/app/services/collection.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-edit-collection',
  templateUrl: './create-edit-collection.component.html',
  styleUrls: ['./create-edit-collection.component.css'],
})
export class CreateEditCollectionComponent {
  @Input() collection: Collection = {
    id: '',
    name: '',
    individuals: [],
  };

  constructor(
    private collectionService: CollectionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  updateOrCreate() {
    this.collectionService.createCollection(this.collection.name).subscribe(
      (data: any) => {
        this.snackBar.open(
          data.message || 'Successfully created collection.',
          'Close',
          {
            duration: 5000,
          }
        );
        this.dialog.closeAll();
      },
      (e) => {
        console.log(e);
        this.snackBar.open(e.error, 'Close', {
          duration: 5000,
        });
      }
    );
  }
}
