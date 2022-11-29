import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item-drink',
  templateUrl: './list-item-drink.component.html',
})
export class ListItemDrinkComponent {
  @Input() drink: any;
  @Input() image: any;
}
