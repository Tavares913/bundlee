import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { IndividualComponent } from './components/individual/individual.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { HomeComponent } from './components/home/home.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IndividualListComponent } from './components/individual/individual-list/individual-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    IndividualComponent,
    CollectionsComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    IndividualListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
