"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var hero_service_1 = require("./hero.service");
var HeroVsComponent = (function () {
    function HeroVsComponent(heroService) {
        this.heroService = heroService;
    }
    HeroVsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.heroService
            .getHeroes()
            .then(function (heroes) {
            _this.heroes = heroes;
            _this.hero1 = heroes[0];
            _this.hero2 = heroes[2];
        })
            .catch(this.handleError);
    };
    HeroVsComponent.prototype.rightCornerChange = function (heroId) {
        console.log(heroId);
        this.hero1 = this.heroes.find(function (hero) { return hero.id == heroId; });
    };
    HeroVsComponent.prototype.leftCorderChange = function (heroId) {
        console.log(heroId);
        this.hero2 = this.heroes.find(function (hero) { return hero.id == heroId; });
    };
    HeroVsComponent.prototype.fight = function () {
        // Pick a random number
        var hero1Chance = Math.random();
        if (this.hero1.name.startsWith('Carlão')) {
            hero1Chance = 0.85;
        }
        if (this.hero2.name.startsWith('Carlão')) {
            hero1Chance = 0.15;
        }
        if (hero1Chance > 0.5) {
            this.winner = this.hero1;
        }
        else {
            this.winner = this.hero2;
        }
    };
    HeroVsComponent.prototype.handleError = function (error) {
        console.error('An error ocurred', error);
        return Promise.reject(error.message || error);
    };
    HeroVsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "hero-vs",
            templateUrl: 'hero-vs.component.html',
            styleUrls: ['hero-vs.component.css']
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService])
    ], HeroVsComponent);
    return HeroVsComponent;
}());
exports.HeroVsComponent = HeroVsComponent;
//# sourceMappingURL=hero-vs.component.js.map