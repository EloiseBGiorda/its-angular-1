import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/_service/api.service';
import { DrinkCard } from 'src/app/_models/drink-card.model';

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
  drinks: DrinkCard[] = [];
  ingredients: any[] = [];

  constructor(private service: ApiService) {}

  searchByName() {
    if (this.jsonIn.drinkName)
      this.service
        .lookupDrinkByName(this.jsonIn.drinkName)
        .subscribe((response: any) => {
          console.log(response);
          this.drinks = response;
        });
  }

  searchByIngredient() {
    if (this.jsonIn.ingredientName)
      this.service
        .lookupDrinkByIngredient(this.jsonIn.ingredientName)
        .subscribe((response: any) => {
          console.log(response);
          this.drinks = response;
        });
  }

  getIngredients() {
    this.service.lookupIngredients().subscribe((response: any) => {
      this.ingredients = response;
    });
  }

  ngOnInit(): void {
    this.getIngredients();
  }
}
