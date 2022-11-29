import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DrinkCard } from '../_models/drink-card.model';
import { ApiService } from '../_service/api.service';

@Injectable({ providedIn: 'root' })
export class LookupdrinkByLetterResolver implements Resolve<DrinkCard[]> {
  constructor(private service: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<DrinkCard[]> {
    return this.service.lookupDrinkByLetter(route.paramMap.get('letter')!);
  }
}
