import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Renderer2 } from '@angular/core';
import { ApiService } from 'src/app/_service/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  jsonIn = {
    drinkName: '',
  };
  drinks: any[] = [];
  orderedDrinks: any[] = [];
  image = {
    selected: 'https://www.svgrepo.com/show/149824/check-mark.svg',
    unselected: 'https://www.svgrepo.com/show/125019/close.svg',
  };
  drinkSearched = false;

  orderedDrinksIds: string[] = [];

  constructor(private service: ApiService) {}

  searchByName() {
    this.drinkSearched = true;
    if (this.jsonIn.drinkName)
      this.service
        .lookupDrinkByName(this.jsonIn.drinkName)
        .subscribe((response: any) => {
          this.drinks = response;
          this.drinks.forEach((drink) => this.checkOrderedDrinks(drink));
        });
  }

  toggleSelection(event: any, drink: any) {
    if (drink.selected) {
      drink.selected = false;

      for (let i = 0; i < this.orderedDrinksIds.length; i++) {
        if (drink.idDrink === this.orderedDrinksIds[i])
          this.orderedDrinksIds.splice(i, 1);
      }
      for (let i = 0; i < this.orderedDrinks.length; i++) {
        if (drink.idDrink === this.orderedDrinks[i].idDrink)
          this.orderedDrinks.splice(i, 1);
      }
    } else {
      if (this.orderedDrinksIds.length < 5) {
        drink.selected = true;
        this.orderedDrinksIds.push(drink.idDrink);
        this.orderedDrinks.push(drink);
      } else {
        alert('You can only order 5 drinks at a time');
      }
    }
  }

  checkOrderedDrinks(drink: any) {
    for (let i = 0; i < this.orderedDrinksIds.length; i++) {
      if (drink.idDrink === this.orderedDrinksIds[i]) {
        drink.selected = true;
      }
    }
  }

  deselectOrdered(drink: any) {
    for (let i = 0; i < this.orderedDrinksIds.length; i++) {
      if (drink.idDrink === this.orderedDrinksIds[i])
        this.orderedDrinksIds.splice(i, 1);
    }
    for (let i = 0; i < this.orderedDrinks.length; i++) {
      if (drink.idDrink === this.orderedDrinks[i].idDrink)
        this.orderedDrinks.splice(i, 1);
    }
    drink.selected = true;
    for (let i = 0; i < this.drinks.length; i++) {
      if (this.drinks[i].idDrink === drink.idDrink)
        this.drinks[i].selected = false;
    }
  }

  ngOnInit(): void {}
}
