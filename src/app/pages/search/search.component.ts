import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  jsonIn = {
    drinkName: '',
    ingredientName: '',
  };
  drinks: any[] = [];
  ingredients: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private location: Location
  ) {}

  searchByName() {
    console.log(this.jsonIn);
    if (this.jsonIn.drinkName)
      this.httpClient
        .get(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.jsonIn.drinkName}`
        )
        .subscribe((response: any) => {
          console.log(response);
          this.drinks = response.drinks;
        });
  }

  searchByIngredient() {
    console.log(this.jsonIn.ingredientName);
    if (this.jsonIn.ingredientName)
      this.httpClient
        .get(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.jsonIn.ingredientName}`
        )
        .subscribe((response: any) => {
          console.log(response);
          this.drinks = response.drinks;
        });
  }

  getIngredients() {
    this.httpClient
      .get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
      .subscribe((response: any) => {
        console.log(response);
        this.ingredients = response.drinks;
      });
  }

  ngOnInit(): void {
    this.getIngredients();
  }

  back(): void {
    this.location.back();
  }
}
