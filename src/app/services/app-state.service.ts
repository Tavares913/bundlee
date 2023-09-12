import { Injectable } from '@angular/core';
import { Individual } from '../components/individual/individual.component';
import { BehaviorSubject } from 'rxjs';
import { Collection } from '../components/collections/my-collections/my-collections.component';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  // route tried to access before forced to login
  public attemptedRoute: string[] = ['/home'];
  // for login component, whether logging in or registering
  public register = new BehaviorSubject<boolean>(false);
  // my collections component, list of users collections
  public collections = new BehaviorSubject<Collection[]>([]);
  private curIndividual: Individual | null = null;

  constructor() {}

  public get individual() {
    return this.curIndividual;
  }
  public setIndividual(i: Individual) {
    this.curIndividual = i;
  }
  public setResgister(r: boolean) {
    this.register.next(r);
  }
  public setCollections(c: Collection[]) {
    this.collections.next(c);
  }
}
