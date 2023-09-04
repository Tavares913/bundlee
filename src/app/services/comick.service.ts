import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComickService {
  private baseUrl: string = 'https://api.comick.fun';

  constructor(private http: HttpClient) {}

  searchManga(search: string | null | undefined) {
    if (!search) return of([]);
    return this.http.get<ComickSearchMangaResponse[]>(
      `${this.baseUrl}/v.1.0/search?q=${search}`
    );
  }
}

export interface ComickSearchMangaResponse {
  id: string;
  title: string;
  rating: number;
  bayesian_rating: number;
}
