import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MangaDexRatingResponse,
  MangaDexSearchMangaResponse,
  MangadexService,
} from 'src/app/services/mangadex.service';
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

  mediaOptions: string[] = [
    'anime',
    'manga / ln',
    'games',
    'movies',
    'tv shows',
  ];

  search: string = '';
  media: string = 'anime';
  loading: boolean = false;
  loadingPaginate: boolean = false;
  searched = false;
  individuals: Individual[] = [];

  total = 0;
  offset = 0;
  limit = MangadexService.MangadexPaginationLimit;

  constructor(
    private mangadexService: MangadexService,
    private snackBar: MatSnackBar
  ) {}

  searchIndividual(config: { refresh: boolean }) {
    if (config.refresh) {
      this.offset = 0;
      this.loading = true;
    } else {
      this.loadingPaginate = true;
    }

    if (this.media === 'manga / ln') {
      this.mangadexService
        .searchMangaPagination(this.search, {
          limit: this.limit,
          offset: this.offset,
        })
        .subscribe(
          (data: MangaDexSearchMangaResponse) => {
            this.offset += this.limit;
            this.total = data.total;
            const formattedData: Individual[] = data.data.map((d) => {
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
            });
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
                      rating: value.rating.bayesian,
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
  rating: number | null;
  coverLink: string;
  thumbnailLink: string;
}
