import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnilistService {
  constructor() {}

  async searchAnimePaginate(
    search: string,
    paginationInfo: PaginationInfo
  ): Promise<AnilistSearchAnimeResponse> {
    const query = `
      query ($page: Int, $perPage: Int, $search: String, $type: MediaType, $asHtml: Boolean, $statusVersion: Int) {
        Page (page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media (search: $search, type: $type) {
            id
            type
            seasonYear
            coverImage {
              extraLarge
              large
            }
            status(version: $statusVersion)
            description(asHtml: $asHtml)
            averageScore
            meanScore
            title {
              romaji
            }
          }
        }
      }
  `;

    const variables = {
      search: search,
      page: paginationInfo.page,
      perPage: paginationInfo.perPage,
      type: 'ANIME',
      statusVersion: 2,
      asHtml: false,
    };

    const url = 'https://graphql.anilist.co',
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      };

    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  }

  async searchManga(search: string): Promise<AnilistSearchMangaResponse> {
    const query = `
      query ($page: Int, $perPage: Int, $search: String, $type: MediaType) {
        Page (page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media (search: $search, type: $type) {
            id
            type
            averageScore
            meanScore
            title {
              romaji
            }
          }
        }
      }
  `;

    const variables = {
      search: search,
      page: 1,
      perPage: 20,
      type: 'MANGA',
    };

    const url = 'https://graphql.anilist.co',
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      };

    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  }
}

export interface PaginationInfo {
  page: number;
  perPage: number;
  total: number;
}
export interface AnilistSearchAnimeResponse {
  data: {
    Page: {
      pageInfo: {
        total: number;
        currentPage: number;
        lastPage: number;
        hasNextPage: number;
        perPage: number;
      };
      media: {
        id: number;
        type: string;
        seasonYear: number;
        coverImage: {
          extraLarge: string;
          large: string;
        };
        description: string;
        averageScore: number;
        status: string;
        meanScore: number;
        title: {
          [key: string]: string;
        };
      }[];
    };
  };
}
export interface AnilistSearchMangaResponse {
  data: {
    Page: {
      media: {
        id: number;
        type: string;
        averageScore: number;
        meanScore: number;
        title: {
          [key: string]: string;
        };
      }[];
    };
  };
}
