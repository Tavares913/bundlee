import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Collection } from '../components/collections/my-collections/my-collections.component';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private baseUrl = 'http://localhost:8080/api/collection';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createUpdateCollection(collection: Collection) {
    let sendObj = collection;
    const sendIndividuals = collection.individuals.map((i) => ({
      ...i,
      description: i.description.substring(0, 97) + '...',
      rating: null,
    }));
    sendObj.individuals = sendIndividuals;
    console.log(sendObj);

    return this.http.post<{ message: string }>(
      `${this.baseUrl}/create-edit`,
      sendObj
    );
  }
  getCollections() {
    return this.http.get<Collection[]>(`${this.baseUrl}/get`);
  }
}
