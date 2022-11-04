import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
})
export class DrinksComponent implements OnInit {
  drinkDetails: any;
  drinkIngredients: String[] = [];
  lang: string = 'en';
  instructions: string[] = [];

  sumIngredients = () => {
    var drinkKeys = Object.keys(this.drinkDetails);
    for (const key of drinkKeys) {
      if (key.startsWith('strIngredient')) {
        if (this.drinkDetails[key] != null) {
          this.drinkIngredients.push(this.drinkDetails[key]);
        }
      }
    }
  };

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private location: Location
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idDrink')!;
    this.httpClient
      .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .subscribe((response: any) => {
        console.log(response);
        this.drinkDetails = response.drinks[0];
        this.sumIngredients();
        this.getLanguages();
      });
  }

  getLanguages = () => {
    this.instructions.push(this.drinkDetails.strInstructions);
    if (this.drinkDetails.strInstructionsES != null) {
      this.instructions.push(this.drinkDetails.strInstructionsES);
    } else {
      this.instructions.push(this.drinkDetails.strInstructions);
    }
    if (this.drinkDetails.strInstructionsDE != null) {
      this.instructions.push(this.drinkDetails.strInstructionsDE);
    } else {
      this.instructions.push(this.drinkDetails.strInstructions);
    }
    if (this.drinkDetails.strInstructionsFR != null) {
      this.instructions.push(this.drinkDetails.strInstructionsFR);
    } else {
      this.instructions.push(this.drinkDetails.strInstructions);
    }
    if (this.drinkDetails.strInstructionsIT != null) {
      this.instructions.push(this.drinkDetails.strInstructionsIT);
    } else {
      this.instructions.push(this.drinkDetails.strInstructions);
    }
  };

  back(): void {
    this.location.back();
  }
}
