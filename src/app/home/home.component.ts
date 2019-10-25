import { Component, OnInit } from '@angular/core';
import { DatenService } from '../daten.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public shoppingProfile = {
    category: '-1',
    subCategory: '-1',
  };
  public cart = [];
  public response = false;
  public articles = {};
  public categories = [];
  public games = {};
  public books = {};
  public audioBooks = {};
  public shoes = {};
  public things = {};

  constructor(
    private datenService: DatenService,
    private router: Router
  ) {}

  add(category, subCategory, i) {
    this.router.navigate(['/add', category, subCategory, i]);
    this.cart.push({
      category,
      subCategory,
      i,
    });
    const cartAsJSON = JSON.stringify(this.cart);
    localStorage.setItem('cart', cartAsJSON);
  }

  ngOnInit() {
    if (localStorage.getItem('cart') === null) {
      this.cart = [];
      const cartAsJSON = JSON.stringify(this.cart);
      localStorage.setItem('cart', cartAsJSON);
    } else {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
    this.datenService.getData().subscribe(
      values => {
        this.response = true;
        this.articles = values;
        values.forEach(value => {
          const category = {
            name: '',
            subCategories: [],
          };
          category.name = value.name;
          value.gruppe.forEach(cat => {
            category.subCategories.push(cat.name);
          });
          this.categories.push(category);
        });
        this.games = values[0].gruppe[0].artikel;
        this.books = values[0].gruppe[1].artikel;
        this.audioBooks = values[0].gruppe[2].artikel;
        this.shoes = values[1].gruppe[0].artikel;
        this.things = values[1].gruppe[1].artikel;
      },
      error => console.log(error),
      () => console.log('fertig')
    );
  }
}
