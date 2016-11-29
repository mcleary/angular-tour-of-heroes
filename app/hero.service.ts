import { Injectable } from '@angular/core'
import { Headers, Http } from "@angular/http";

import { Hero } from './hero';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class HeroService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'http://192.168.0.110:5000/heroes';

  constructor(private http : Http) {}

  getHero(id: number) : Promise<Hero> {
    console.log("Get Hero " + id);
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  getHeroes(): Promise<Hero[]> {
    console.log("Hero Service: getHeroes() from url " + this.heroesUrl);
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json() as Hero[])
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(hero : Hero) : Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  vs(hero1: Hero, hero2: Hero) : Promise<Hero> {
    const url = `${this.heroesUrl}/vs`;
    return this.http
      .post(url, JSON.stringify([hero1, hero2]), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error ocurred', error);
    return Promise.reject(error.message || error);
  }
}
