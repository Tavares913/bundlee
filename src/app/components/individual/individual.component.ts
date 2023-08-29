import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MangaDexGetResponse,
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
  prevSearch: SearchInfo = {
    search: '',
    media: '',
  };
  searched = false;
  individuals: Individual[] = [];

  offset = 0;
  limit = MangadexService.MangadexPaginationLimit;

  constructor(
    private mangadexService: MangadexService,
    private snackBar: MatSnackBar
  ) {}

  searchIndividual() {
    if (
      this.prevSearch.search !== this.search ||
      this.prevSearch.media !== this.media
    )
      this.offset = 0;

    if (this.media === 'manga / ln') {
      this.loading = true;
      this.mangadexService
        .searchMangaPagination(this.search, {
          limit: this.limit,
          offset: this.offset,
        })
        .subscribe(
          (data: MangaDexGetResponse) => {
            this.offset += this.limit;
            this.prevSearch = { search: this.search, media: this.media };
            console.log(data);
            if (data.result !== 'ok') {
              return;
            }
            const formattedData: Individual[] = data.data.map((d) => {
              return {
                id: d.id,
                title:
                  d.attributes.title['en'] ||
                  d.attributes.description['jp'] ||
                  '',
                type: d.type,
                rating: undefined,
                year: d.attributes.year,
                description:
                  d.attributes.description['en'] ||
                  d.attributes.description['jp'] ||
                  '',
                status: d.attributes.status,
              };
            });
            this.loading = false;
            this.searched = true;
            this.individuals = formattedData;
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

export interface SearchInfo {
  search: string;
  media: string;
}

export interface Individual {
  id: string;
  title: string;
  type: string;
  year: number;
  description: string;
  status: string;
}
