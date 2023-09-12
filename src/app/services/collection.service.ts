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

  createCollection(name: string) {
    return this.http.post<{ message: string }>(`${this.baseUrl}/create`, {
      name,
    });
  }
  getCollections() {
    return this.http.get<Collection[]>(`${this.baseUrl}/get`);
  }
}
