import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AnilistService,
  PaginationInfo,
} from 'src/app/services/anilist.service';
import {
  MangaDexRatingResponse,
  MangaDexSearchMangaResponse,
  MangadexService,
} from 'src/app/services/mangadex.service';
import { MetacriticService } from 'src/app/services/metacritic.service';
import { Theme } from 'src/app/theme';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css'],
})
export class IndividualComponent {
  theme = Theme;
  util = Util;

  mediaOptions: string[] = ['anime', 'manga', 'games', 'movies', 'tv shows'];
  platformOptions: string[] = [
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
      const anime = data.data.Page.media;
      const formattedData: Individual[] = anime.map((d) => {
        return {
          id: d.id.toString(),
          title: d.title['romaji'] || '',
          type: d.type.toLowerCase(),
          rating: {
            anilist: d.averageScore / 10,
          },
          year: d.seasonYear,
          description: d.description,
          status: d.status.toLowerCase(),
          thumbnailLink: d.coverImage.large,
          coverLink: d.coverImage.extraLarge,
        };
      });
      this.loading = false;
      this.loadingPaginate = false;
      this.searched = true;
      if (config.refresh) this.individuals = formattedData;
      else this.individuals = [...this.individuals, ...formattedData];
      console.log(this.paginationInfo);
    } else if (this.media === 'manga') {
      this.mangadexService
        .searchMangaPagination(this.search, this.paginationInfo)
        .subscribe(
          (data: MangaDexSearchMangaResponse) => {
            this.paginationInfo.page += 1;
            this.paginationInfo.total = data.total;
            const formattedData: Individual[] = data.data.map(
              (d) => {
                const coverRelationship = d.relationships.find(
                  (r: any) => r.type === 'cover_art'
                );
                return {
                  id: d.id,
                  title:
                    d.attributes.title['en'] ||
                    d.attributes.description['jp'] ||
                    '',
                  type: d.type,
                  rating: null,
                  year: d.attributes.year,
                  description:
                    d.attributes.description['en'] ||
                    d.attributes.description['jp'] ||
                    '',
                  status: d.attributes.status,
                  thumbnailLink: coverRelationship
                    ? `https://uploads.mangadex.org/covers/${d.id}/${coverRelationship.attributes.fileName}.256.jpg`
                    : '',
                  coverLink: coverRelationship
                    ? `https://uploads.mangadex.org/covers/${d.id}/${coverRelationship.attributes.fileName}.512.jpg`
                    : '',
                };
              },
              (e: Error) => {
                this.snackBar.open(e.message, 'Close', {
                  duration: 5000,
                });
              }
            );
            this.loading = false;
            this.loadingPaginate = false;
            this.searched = true;
            if (config.refresh) this.individuals = formattedData;
            else this.individuals = [...this.individuals, ...formattedData];

            this.mangadexService
              .getRatings(this.individuals.map((i) => i.id))
              .subscribe(
                (data: MangaDexRatingResponse) => {
                  for (const [key, value] of Object.entries(data.statistics)) {
                    const i = this.individuals.findIndex((e) => e.id === key);
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
      // const data = await this.metacriticService.searchGames(
      //   this.search,
      //   this.platform
      // );
      // console.log(data);
    } else if (this.media === 'movies') {
      const res = await fetch(
        'https://imdb-api.projects.thetuhin.com/title/tt6522580'
      );
      const data = await res.json();
      console.log(data);
    }
  }
}

export interface Individual {
  id: string;
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
}
