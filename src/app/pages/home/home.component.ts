import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  drinks: any[] = [];

  jsonIn = {
    searchName: '',
  };

  featuredDrink: any;

  letterIdx: number = 0;

  letters: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

  getDrinksByLetter = (
    route: ActivatedRoute,
    httpClient: HttpClient,
    lett: string
  ) => {
    for (var i = 0; i < this.letters.length; i++) {
      if (lett.toLowerCase() === this.letters[i]) {
        this.letterIdx = i;
      }
    }
    this.httpClient
      .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${lett}`)
      .subscribe((response: any) => {
        this.drinks = response.drinks;
        if (this.drinks) this.sortDrinks();
      });
  };

  getFeaturedDrink = () => {
    this.httpClient
      .get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
      .subscribe((response: any) => {
        console.log(response);
        this.featuredDrink = response.drinks[0];
      });
  };

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.getDrinksByLetter(
          this.route,
          this.httpClient,
          route.snapshot.paramMap.get('letter')!
        );
      }
    });
  }
  ngOnInit(): void {
    const lett = this.route.snapshot.paramMap.get('letter')!;
    this.getDrinksByLetter(this.route, this.httpClient, lett);
    this.getFeaturedDrink();
  }

  refresh(): void {
    window.location.reload();
  }

  sortDrinks() {
    const sortedList = this.drinks.sort((a, b) =>
      a.strDrink.localeCompare(b.strDrink)
    );
    console.log(sortedList);
  }

  printJson() {
    console.log(this.jsonIn);
    this.httpClient
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.jsonIn.searchName}`
      )
      .subscribe((response: any) => {
        console.log(response);
        this.drinks = response.drinks;
      });
  }
}
