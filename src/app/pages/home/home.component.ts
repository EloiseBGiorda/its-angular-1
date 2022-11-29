import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_service/api.service';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DrinkCard } from 'src/app/_models/drink-card.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  drinks: DrinkCard[] = [];

  jsonIn = {
    searchName: '',
  };

  featuredDrink: any;

  letterIdx: number = 0;

  letters: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

  getFeaturedDrink = () => {
    this.service.getFeaturedDrink().subscribe((response: any) => {
      this.featuredDrink = response;
    });
  };

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private service: ApiService
  ) {}
  ngOnInit(): void {
    this.route.data.subscribe(({ drink }) => {
      this.drinks = drink;
    });
    this.getFeaturedDrink();
  }

  refresh(): void {
    window.location.reload();
  }

  trackByDrink(d: any) {
    return d.idDrink;
  }
}
