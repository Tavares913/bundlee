import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Collection } from '../components/collections/my-collections/my-collections.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private baseUrl = 'http://localhost:8080/api/collection';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createUpdateCollection(collection: Collection) {
    let sendObj: any = collection;
    const sendIndividuals = collection.individuals.map((i) => ({
      ...i,
      description: i.description.substring(0, 897) + '...',
      rating: JSON.stringify(i.rating),
    }));
    sendObj.individuals = sendIndividuals;
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/create-edit`,
      sendObj
    );
  }
  getUserCollections() {
    return this.http.get<Collection[]>(`${this.baseUrl}/get`).pipe(
      map((c) => {
        return c.map((col) => {
          return {
            ...col,
            individuals: col.individuals.map((ind) => {
              return {
                ...ind,
                rating: JSON.parse(ind.rating as any),
              };
            }),
          };
        });
      })
    );
  }
  searchCollections(name: string) {
    return this.http
      .get<Collection[]>(`${this.baseUrl}/search?name=${name}`)
      .pipe(
        map((c) => {
          return c.map((col) => {
            return {
              ...col,
              individuals: col.individuals.map((ind) => {
                return {
                  ...ind,
                  rating: JSON.parse(ind.rating as any),
                };
              }),
            };
          });
        })
      );
  }
  deleteCollection(id: number) {
    return this.http.delete(`${this.baseUrl}/delete?id=${id}`);
  }
  favouriteCollection(id: number) {
    return this.http.post(`${this.baseUrl}/favourite?collectionId=${id}`, {});
  }
  unfavouriteCollection(id: number) {
    return this.http.post(`${this.baseUrl}/unfavourite?collectionId=${id}`, {});
  }
  getFavouritedCollections() {
    return this.http.get<Collection[]>(`${this.baseUrl}/favourite`).pipe(
      map((c) => {
        return c.map((col) => {
          return {
            ...col,
            individuals: col.individuals.map((ind) => {
              return {
                ...ind,
                rating: JSON.parse(ind.rating as any),
              };
            }),
          };
        });
      })
    );
  }
}
