import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Drink } from 'src/app/_models/drink.model';

@Component({
  selector: 'app-drink',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
})
export class DrinksComponent implements OnInit {
  drinkDetails!: Drink;
  lang: string = 'EN';
  instructionLanguages: string[] = [];
  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ drink }) => {
      this.drinkDetails = drink;
      let instructions = Object.keys(this.drinkDetails.instructions);
      instructions.forEach((instruction) => {
        if (this.drinkDetails.instructions[instruction]) {
          this.instructionLanguages.push(instruction);
        }
      });
    });
  }
}
