import { Component, Input, OnInit, Inject } from '@angular/core';
import { Collection } from '../my-collections/my-collections.component';
import { CollectionService } from 'src/app/services/collection.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Individual,
  mediaOptions,
  platformOptions,
} from '../../individual/individual.component';
import { Theme } from 'src/app/theme';
import { Util } from 'src/app/util';
import { AnilistService } from 'src/app/services/anilist.service';
import {
  MangaDexRatingResponse,
  MangaDexSearchMangaResponse,
  MangadexService,
} from 'src/app/services/mangadex.service';
import {
  MetacriticSearchGamesResponse,
  MetacriticService,
} from 'src/app/services/metacritic.service';
import { ImdbService } from 'src/app/services/imdb.service';
import { AppStateService } from 'src/app/services/app-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-edit-collection',
  templateUrl: './create-edit-collection.component.html',
  styleUrls: ['./create-edit-collection.component.css'],
})
export class CreateEditCollectionComponent implements OnInit {
  theme = Theme;
  util = Util;

  @Input() collection: Collection | undefined;

  mediaOptions: string[] = mediaOptions;
  platformOptions: string[] = platformOptions;

  searchedIndividuals: Individual[] = [];
  searched = false;
  searchedIndividualsExpandedIndex = 0;

  formName: string = '';
  formSearch: string = '';
  formMedia: string = 'anime';
  formPlatform: string = '';
  formIndividuals: Individual[] = [];

  constructor(
    private collectionService: CollectionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private anilistService: AnilistService,
    private mangadexService: MangadexService,
    private metacriticService: MetacriticService,
    private imdbService: ImdbService,
    private appStateService: AppStateService,
    @Inject(MAT_DIALOG_DATA)
    public injectedCollection: { collection: Collection }
  ) {}

  ngOnInit(): void {
    if (this.injectedCollection) {
      const injectedCollection = this.injectedCollection.collection;
      console.log(injectedCollection);
      this.collection = injectedCollection;
      this.formName = injectedCollection.name;
      this.formIndividuals = injectedCollection.individuals;
    }
  }

  updateOrCreate() {
    if (!this.collection) return;
    this.collectionService
      .createUpdateCollection({
        id: this.collection.id,
        name: this.formName,
        individuals: this.formIndividuals,
      })
      .subscribe(
        (data: any) => {
          this.snackBar.open(
            data.message || 'Successfully created/edited collection.',
            'Close',
            {
              duration: 5000,
            }
          );
          this.collectionService
            .getUserCollections()
            .subscribe((data: Collection[]) => {
              this.appStateService.setCollections(data);
              this.dialog.closeAll();
            });
        },
        (e) => {
          this.snackBar.open(e.error, 'Close', {
            duration: 5000,
          });
        }
      );
  }

  delete() {
    if (!this.collection) return;
    if (this.collection.id === -1) return;
    this.collectionService.deleteCollection(this.collection.id).subscribe(
      (data: any) => {
        this.snackBar.open(data.message, 'Close', {
          duration: 5000,
        });
        this.collectionService
          .getUserCollections()
          .subscribe((data: Collection[]) => {
            this.appStateService.setCollections(data);
            this.dialog.closeAll();
          });
      },
      (e) => {
        this.snackBar.open(e.message, 'Close', {
          duration: 5000,
        });
      }
    );
  }

  async searchIndividual() {
    if (this.formMedia === 'anime') {
      let data;
      try {
        data = await this.anilistService.searchAnimePaginate(this.formSearch, {
          page: 1,
          perPage: 20,
          total: 0,
        });
      } catch (e: any) {
        this.snackBar.open(e.message, 'Close', {
          duration: 5000,
        });
        return;
      }
      this.searched = true;
      const formattedData = this.anilistService.anilistAnimeToIndividual(data);
      this.searchedIndividuals = formattedData;
    } else if (this.formMedia === 'manga') {
      this.mangadexService
        .searchMangaPagination(this.formSearch, {
          page: 1,
          perPage: 20,
          total: 0,
        })
        .subscribe(
          (data: MangaDexSearchMangaResponse) => {
            this.searched = true;
            const formattedData: Individual[] =
              this.mangadexService.mangadexMangaToIndividuals(data);

            this.searchedIndividuals = formattedData;
          },
          (e) => {
            this.snackBar.open(e.message, 'Close', {
              duration: 5000,
            });
          }
        );
    } else if (this.formMedia === 'games') {
      this.metacriticService
        .searchGames(this.formSearch, this.formPlatform)
        .subscribe((data: MetacriticSearchGamesResponse) => {
          this.searched = true;
          const formattedData: Individual[] =
            this.metacriticService.metacriticGamesToIndividuals(data);
          this.searchedIndividuals = formattedData;
        });
    } else if (this.formMedia === 'movies / tv shows') {
      this.imdbService.searchMovies(this.formSearch).subscribe(
        (data) => {
          this.searched = true;
          const formattedData: Individual[] =
            this.imdbService.imdbMoviesToIndividuals(data);
          this.searchedIndividuals = formattedData;
        },
        (e) => {
          this.snackBar.open(e.message, 'Close', {
            duration: 5000,
          });
        }
      );
    }
  }

  addSearchIndividualToFormIndividual(individual: Individual) {
    if (
      this.formIndividuals.find(
        (ind) => ind.platformId === individual.platformId
      )
    ) {
      this.snackBar.open(
        'You already have that individual in your list.',
        'Close',
        {
          duration: 5000,
        }
      );
      return;
    }
    this.formIndividuals.push(individual);
  }
  removeFormIndividual(individual: Individual) {
    const i = this.formIndividuals.findIndex(
      (ind) => ind.platformId === individual.platformId
    );
    if (i === -1) return;
    this.formIndividuals.splice(i, 1);
  }
  goToDetails(individual: Individual) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/individual/${individual.id}`])
    );
    window.open(url, '_blank');
  }
}
