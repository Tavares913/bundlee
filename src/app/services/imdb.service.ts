import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Individual } from '../components/individual/individual.component';

@Injectable({
  providedIn: 'root',
})
export class ImdbService {
  private baseUrl = 'https://imdb-api.projects.thetuhin.com';

  constructor(private http: HttpClient) {}

  searchMovies(search: string) {
    return this.http.get<ImdbSearchMoviesResponse>(
      `${this.baseUrl}/search?query=${search}`
    );
  }

  getTitleDetails(id: string) {
    return this.http.get<ImdbGetTitleDetailsResponse>(
      `${this.baseUrl}/title/${id}`
    );
  }

  imdbMoviesToIndividuals(res: ImdbSearchMoviesResponse) {
    const formattedData: Individual[] = res.results.map((d) => {
      return {
        id: -1,
        platformId: d.id,
        platform: 'imdb',
        title: d.title,
        type: d.type.toLowerCase(),
        year: d.year,
        description: '',
        status: '',
        rating: null,
        coverLink: d.image_large,
        thumbnailLink: d.image,
      };
    });

    return formattedData;
  }
}

export interface ImdbSearchMoviesResponse {
  message: string;
  query: string;
  results: {
    api_path: string;
    id: string;
    image: string;
    image_large: string;
    idmb: string;
    title: string;
    type: string;
    year: number;
  }[];
}

export interface ImdbGetTitleDetailsResponse {
  actors: string[];
  award: {
    wins: number;
    nominations: number;
  };
  contentRating: string;
  contentType: string;
  directors: string[];
  filmingLocations: string[];
  genre: string[];
  id: string;
  image: string;
  images: string[];
  imdb: string;
  plot: string;
  productionStatus: string;
  rating: {
    count: number;
    star: number;
  };
  releaseDetailed: {
    day: number;
    month: number;
    year: number;
  };
  review_api_path: string;
  runtime: string;
  runtimeSeconds: number;
  spokenLanguages: {
    language: string;
    id: string;
  }[];
  title: string;
  top_credits: {
    name: string;
    value: string[];
  }[];
  year: number;
}
