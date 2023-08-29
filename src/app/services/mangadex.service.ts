import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MangadexService {
  private baseUrl = 'https://api.mangadex.org';
  public static MangadexPaginationLimit = 20;

  constructor(private http: HttpClient) {}

  searchMangaPagination(
    searchTerm: string,
    paginationInfo: MangaDexPaginationInfo
  ) {
    const options = {
      params: new HttpParams().set('title', searchTerm),
    };

    const paginationUrl = `limit=${paginationInfo.limit}&offset=${paginationInfo.offset}`;
    return this.http.get<MangaDexGetResponse>(
      `${this.baseUrl}/manga?${paginationUrl}`,
      options
    );
  }
}

export interface MangaDexGetResponse {
  data: any[];
  limit: number;
  offset: number;
  response: string;
  result: string;
  total: number;
}

export interface MangaDexPaginationInfo {
  limit: number;
  offset: number;
}
