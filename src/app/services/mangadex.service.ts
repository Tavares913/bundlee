import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationInfo } from './anilist.service';

@Injectable({
  providedIn: 'root',
})
export class MangadexService {
  private baseUrl = 'https://api.mangadex.org';

  constructor(private http: HttpClient) {}

  searchMangaPagination(searchTerm: string, paginationInfo: PaginationInfo) {
    const options = {
      params: new HttpParams().set('title', searchTerm),
    };

    const paginationUrl = `limit=${paginationInfo.perPage}&offset=${
      (paginationInfo.page - 1) * paginationInfo.perPage
    }`;
    return this.http.get<MangaDexSearchMangaResponse>(
      `${this.baseUrl}/manga?${paginationUrl}&includes[]=manga&includes[]=cover_art&includes[]=author&includes[]=artist&includes[]=tag&includes[]=creator`,
      options
    );
  }
  getRatings(ids: string[]) {
    const ratingSearchString = ids.reduce(
      (acc, cur) => (acc += `&manga[]=${cur}`),
      ''
    );
    return this.http.get<MangaDexRatingResponse>(
      `${this.baseUrl}/statistics/manga?${ratingSearchString.substring(1)}`
    );
  }
}

export interface MangaDexSearchMangaResponse {
  data: any[];
  limit: number;
  offset: number;
  response: string;
  result: string;
  total: number;
}

export interface MangaDexRatingResponse {
  result: string;
  statistics: {
    [key: string]: {
      comments: { threadId: number; repliesCount: number };
      follows: number;
      rating: { average: number; bayesian: number };
    };
  };
}
