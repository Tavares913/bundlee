import { Injectable } from '@angular/core';
import { Individual } from '../components/individual/individual.component';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  public attemptedRoute: string[] = ['/home'];
  private curIndividual: Individual | null = null;

  constructor() {}

  public get individual() {
    return this.curIndividual;
  }
  public setIndividual(i: Individual) {
    this.curIndividual = i;
  }
}
