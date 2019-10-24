import { Component, OnInit } from '@angular/core';
import { DatenService } from '../daten.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public cart = {};
  public response = false;
  public articles = {};

  constructor(private datenService: DatenService) {}

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.datenService.getData().subscribe(
      values => {
        this.response = true;
        this.articles = values;
      },
      error => console.log(error),
      () => console.log('fertig')
    );
  }
}
