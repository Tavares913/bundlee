import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MetacriticService {
  constructor() {}

  async searchGames(search: string, platform: string) {
    const query = `
      query getGames($title: String!, $platform: GamePlatform!) {
        games(input: {title: $title, platform: $platform}) {
          title
          platform
          criticScore
          url
          releaseDate
          developer
          publisher
          genres
          numOfCriticReviews
          numOfPositiveCriticReviews
          numOfMixedCriticReviews
          numOfNegativeCriticReviews
          productImage
        }
      }
  `;

    const variables = {
      title: search,
      platform: platform,
    };

    const url = 'https://mcgqlapi.com/api',
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
