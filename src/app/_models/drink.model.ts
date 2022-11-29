export interface Drink {
  strDrinkThumb: string;
  strDrink: string;
  strCategory: string;
  ingredients: {
    name: string;
    measure: string;
  }[];
  instructions: any;
}
