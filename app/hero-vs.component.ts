import { OnInit, Component } from "@angular/core";

import { HeroService } from "./hero.service";
import { Hero } from "./hero";

@Component({
  moduleId: module.id,
  selector: "hero-vs",
  templateUrl: 'hero-vs.component.html',
  styleUrls: [ 'hero-vs.component.css' ]
})
export class HeroVsComponent implements OnInit {
  heroes: Hero[];
  hero1: Hero;
  hero2: Hero;
  winner: Hero;

  constructor(
    private heroService : HeroService
  ) {

  }

  ngOnInit() {
    this.heroService
      .getHeroes()
      .then(heroes => {
        this.heroes = heroes;
        this.hero1 = heroes[0];
        this.hero2 = heroes[2];
      })
      .catch(this.handleError)
  }

  rightCornerChange(heroId: number) {
    console.log(heroId);
    this.hero1 = this.heroes.find(hero => hero.id == heroId);
  }

  leftCorderChange(heroId: number) {
    console.log(heroId);
    this.hero2 = this.heroes.find(hero => hero.id == heroId);
  }

  fight() {
    // Pick a random number
    let hero1Chance = Math.random();

    if(this.hero1.name.startsWith('Carlão')) {
      hero1Chance = 0.85;
    }
    if(this.hero2.name.startsWith('Carlão')) {
      hero1Chance = 0.15;
    }

    if(hero1Chance > 0.5) {
      this.winner = this.hero1;
    } else {
      this.winner = this.hero2;
    }
  }

  handleError(error: any): Promise<any> {
    console.error('An error ocurred', error);
    return Promise.reject(error.message || error);
  }
}
