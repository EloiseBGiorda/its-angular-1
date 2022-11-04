import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { IngredientComponent } from './pages/ingredient/ingredient.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'search', component: SearchComponent },
  { path: 'home/:letter', component: HomeComponent },
  { path: 'ingredient/:ingredient', component: IngredientComponent },
  { path: 'drink/:idDrink', component: DrinksComponent },
  { path: 'home', redirectTo: '/home/a', pathMatch: 'full' },
  { path: '', redirectTo: '/home/a', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
