import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AnilistService,
  PaginationInfo,
} from 'src/app/services/anilist.service';
import { ImdbService } from 'src/app/services/imdb.service';
import {
  MangaDexRatingResponse,
  MangaDexSearchMangaResponse,
  MangadexService,
} from 'src/app/services/mangadex.service';
import {
  MetacriticSearchGamesResponse,
  MetacriticService,
} from 'src/app/services/metacritic.service';
import { Theme } from 'src/app/theme';
import { Util } from 'src/app/util';

export const mediaOptions: string[] = [
  'anime',
  'manga',
  'games',
  'movies / tv shows',
];
export const platformOptions: string[] = [
  'PC',
  'GBA',
  'DS',
  'N64',
  'GC',
  'WII',
  'WIIU',
  'SWITCH',
  'PS1',
  'PS2',
  'PS3',
  'PS4',
  'PS5',
  'X360',
  'XBONE',
  'XSX',
  'STADIA',
];

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css'],
})
export class IndividualComponent {
  theme = Theme;
  util = Util;

  mediaOptions: string[] = mediaOptions;
  platformOptions: string[] = platformOptions;

  search: string = '';
  media: string = 'anime';
  platform: string = '';
  loading: boolean = false;
  loadingPaginate: boolean = false;
  searched = false;
  individuals: Individual[] = [];

  paginationInfo: PaginationInfo = {
    total: 0,
    page: 1,
    perPage: 20,
  };

  constructor(
    private mangadexService: MangadexService,
    private anilistService: AnilistService,
    private metacriticService: MetacriticService,
    private imdbService: ImdbService,
    private snackBar: MatSnackBar
  ) {}

  async searchIndividual(config: { refresh: boolean }) {
    if (config.refresh) {
      this.paginationInfo.page = 1;
      this.paginationInfo.total = 0;
      this.loading = true;
    } else {
      this.loadingPaginate = true;
    }

    if (this.media === 'anime') {
      let data;
      try {
        data = await this.anilistService.searchAnimePaginate(
          this.search,
          this.paginationInfo
        );
      } catch (e: any) {
        this.snackBar.open(e.message, 'Close', {
          duration: 5000,
        });
        return;
      }

      this.paginationInfo.total = data.data.Page.pageInfo.total;
      this.paginationInfo.page += 1;
      const formattedData = this.anilistService.anilistAnimeToIndividual(data);
      this.loading = false;
      this.loadingPaginate = false;
      this.searched = true;
      if (config.refresh) this.individuals = formattedData;
      else this.individuals = [...this.individuals, ...formattedData];
    } else if (this.media === 'manga') {
      this.mangadexService
        .searchMangaPagination(this.search, this.paginationInfo)
        .subscribe(
          (data: MangaDexSearchMangaResponse) => {
            this.paginationInfo.page += 1;
            this.paginationInfo.total = data.total;
            const formattedData: Individual[] =
              this.mangadexService.mangadexMangaToIndividuals(data);
            this.loading = false;
            this.loadingPaginate = false;
            this.searched = true;
            if (config.refresh) this.individuals = formattedData;
            else this.individuals = [...this.individuals, ...formattedData];

            this.mangadexService
              .getRatings(this.individuals.map((i) => i.platformId))
              .subscribe(
                (data: MangaDexRatingResponse) => {
                  for (const [key, value] of Object.entries(data.statistics)) {
                    const i = this.individuals.findIndex(
                      (e) => e.platformId === key
                    );
                    if (i === -1) continue;
                    this.individuals[i] = {
                      ...this.individuals[i],
                      rating: {
                        mangadex: value.rating.bayesian,
                      },
                    };
                  }
                },
                (e) => {
                  this.snackBar.open(e.message, 'Close', {
                    duration: 5000,
                  });
                }
              );
          },
          (e) => {
            this.snackBar.open(e.message, 'Close', {
              duration: 5000,
            });
            this.loading = false;
          }
        );
    } else if (this.media === 'games') {
      this.metacriticService
        .searchGames(this.search, this.platform)
        .subscribe((data: MetacriticSearchGamesResponse) => {
          const formattedData: Individual[] =
            this.metacriticService.metacriticGamesToIndividuals(data);
          this.loading = false;
          this.loadingPaginate = false;
          this.searched = true;
          if (config.refresh) this.individuals = formattedData;
          else this.individuals = [...this.individuals, ...formattedData];
        });
    } else if (this.media === 'movies / tv shows') {
      this.imdbService.searchMovies(this.search).subscribe(
        (data) => {
          const formattedData: Individual[] =
            this.imdbService.imdbMoviesToIndividuals(data);
          this.paginationInfo.total = data.results.length;
          this.paginationInfo.page += 1;
          this.loading = false;
          this.loadingPaginate = false;
          this.searched = true;
          if (config.refresh) this.individuals = formattedData;
          else this.individuals = [...this.individuals, ...formattedData];
        },
        (e) => {
          this.snackBar.open(e.message, 'Close', {
            duration: 5000,
          });
          this.loading = false;
        }
      );
    }
  }
}

export interface Individual {
  id: number;
  platformId: string;
  platform: string;
  title: string;
  type: string;
  year: number;
  description: string;
  status: string;
  rating: {
    [key: string]: number;
  } | null;
  coverLink: string;
  thumbnailLink: string;
  extra?: any;
}
