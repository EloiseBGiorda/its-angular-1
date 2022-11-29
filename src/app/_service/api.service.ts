import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Drink } from '../_models/drink.model';
import { DrinkCard } from '../_models/drink-card.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  searchCocktailByFirstLetter(firstLetter: string) {
    return this.httpClient.get(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=' + firstLetter
    );
  }

  lookupDrinkByName(name: string) {
    return this.httpClient
      .get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name)
      .pipe(
        map((response: any) => {
          const drinks: DrinkCard[] = response.drinks as DrinkCard[];
          return drinks;
        })
      );
  }

  lookupDrinkById(id: string) {
    return this.httpClient
      .get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id)
      .pipe(
        map((response: any) => {
          const drink: Drink = response.drinks[0] as Drink;
          drink.ingredients = [];
          drink.instructions = [];
          Object.keys(drink).forEach((key) => {
            const keyName = key as keyof typeof drink;

            if (key.startsWith('strIngredient') && drink[keyName]) {
              const index = key.replace('strIngredient', '');
              const keyMeasure = ('strMeasure' + index) as keyof typeof drink;
              console.log(index);
              drink.ingredients.push({
                name: drink[keyName],
                measure: drink[keyMeasure],
              });
            }
            if (key.startsWith('strInstructions') && drink[keyName]) {
              let lang = key.replace('strInstructions', '');
              if (!lang) {
                lang = 'EN';
              }
              drink.instructions[lang] = drink[keyName];
            }
          });
          return drink;
        })
      );
  }

  lookupDrinkByIngredient(ingr: string) {
    return this.httpClient
      .get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingr)
      .pipe(
        map((response: any) => {
          const drinks: DrinkCard[] = response.drinks as DrinkCard[];
          return drinks;
        })
      );
  }

  lookupDrinkByLetter(letter: string) {
    return this.httpClient
      .get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=' + letter)
      .pipe(
        map((response: any) => {
          const drinks: DrinkCard[] = response.drinks as DrinkCard[];
          drinks.sort((a, b) => a.strDrink.localeCompare(b.strDrink));
          return drinks;
        })
      );
  }

  lookupIngredients() {
    return this.httpClient
      .get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
      .pipe(
        map((response: any) => {
          const ingredients: any[] = response.drinks as any[];
          ingredients.sort((a, b) =>
            a.strIngredient1.localeCompare(b.strIngredient1)
          );
          return ingredients;
        })
      );
  }

  getFeaturedDrink() {
    return this.httpClient
      .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .pipe(
        map((response: any) => {
          const drink: DrinkCard = response.drinks[0] as DrinkCard;
          return drink;
        })
      );
  }
}
