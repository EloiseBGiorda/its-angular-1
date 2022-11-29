import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/_service/api.service';
import { DrinkCard } from 'src/app/_models/drink-card.model';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss'],
})
export class IngredientComponent implements OnInit {
  drinks: DrinkCard[] = [];
  ingredient: string = '';
  ingredientImg: string = '';

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private location: Location,
    private service: ApiService
  ) {}

  ngOnInit(): void {
    this.ingredient = this.route.snapshot.paramMap.get('ingredient')!;
    this.route.data.subscribe(({ drink }) => {
      this.drinks = drink;
      this.ingredientImg = `https://www.thecocktaildb.com/images/ingredients/${this.ingredient}.png`;
    });
  }
  back(): void {
    this.location.back();
  }
}
