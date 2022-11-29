import { Component, Input } from '@angular/core';
import { DrinkCard } from 'src/app/_models/drink-card.model';

@Component({
  selector: 'app-card-drink',
  templateUrl: './card-drink.component.html',
})
export class CardDrinkComponent {
  @Input() drink: DrinkCard = {
    idDrink: '',
    strDrinkThumb: '',
    strDrink: '',
  };
  @Input() button: boolean = false;
}
