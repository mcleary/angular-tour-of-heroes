import { Injectable } from '@angular/core'
import { Headers, Http } from "@angular/http";

import { Hero } from './hero';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class HeroService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'app/heroes';

  constructor(private http : Http) {}

  getHero(id: number) : Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve => setTimeout(resolve, 2000))
      .then(() => this.getHeroes());
  }

  update(hero : Hero) : Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error ocurred', error);
    return Promise.reject(error.message || error);
  }
}
