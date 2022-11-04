import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss'],
})
export class IngredientComponent implements OnInit {
  drinks: any[] = [];
  ingredient: string = '';
  ingredientImg: string = '';

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.ingredient = this.route.snapshot.paramMap.get('ingredient')!;
    console.log(this.ingredient);
    this.httpClient
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.ingredient}`
      )
      .subscribe((response: any) => {
        this.drinks = response.drinks;
        this.ingredientImg = `https://www.thecocktaildb.com/images/ingredients/${this.ingredient}.png`;
      });
  }
  back(): void {
    this.location.back();
  }
}
