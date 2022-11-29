import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { IngredientComponent } from './pages/ingredient/ingredient.component';
import { SearchComponent } from './pages/search/search.component';
import { OrderComponent } from './pages/order/order.component';
import { LookupdrinkByIdResolver } from './_resolvers/lookupdrink-by-id.resolver';
import { LookupdrinkByLetterResolver } from './_resolvers/lookupdrink-by-letter.resolver';
import { LookupdrinkByIngredientResolver } from './_resolvers/lookupdrink-by-ingredient';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'search', component: SearchComponent },
  { path: 'order', component: OrderComponent },
  {
    path: 'home/:letter',
    component: HomeComponent,
    resolve: {
      drink: LookupdrinkByLetterResolver,
    },
  },
  {
    path: 'ingredient/:ingredient',
    component: IngredientComponent,
    resolve: {
      drink: LookupdrinkByIngredientResolver,
    },
  },
  {
    path: 'drink/:idDrink',
    component: DrinksComponent,
    resolve: {
      drink: LookupdrinkByIdResolver,
    },
  },
  { path: 'home', redirectTo: '/home/a', pathMatch: 'full' },
  { path: '', redirectTo: '/home/a', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
