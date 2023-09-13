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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IndividualListComponent } from './components/individual/individual-list/individual-list.component';
import { MatCardModule } from '@angular/material/card';
import { IndividualDetailComponent } from './components/individual/individual-detail/individual-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MyCollectionsComponent } from './components/collections/my-collections/my-collections.component';
import { FavouritedCollectionsComponent } from './components/collections/favourited-collections/favourited-collections.component';
import { SearchCollectionsComponent } from './components/collections/search-collections/search-collections.component';
import { CreateEditCollectionComponent } from './components/collections/create-edit-collection/create-edit-collection.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MatTableModule } from '@angular/material/table';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    IndividualComponent,
    CollectionsComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    IndividualListComponent,
    IndividualDetailComponent,
    LoginComponent,
    MyCollectionsComponent,
    FavouritedCollectionsComponent,
    SearchCollectionsComponent,
    CreateEditCollectionComponent,
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
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    CdkAccordionModule,
    MatListModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
