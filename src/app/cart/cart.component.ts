import { Component, OnInit } from '@angular/core';
import { DatenService } from '../daten.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public cart = [];
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
      () => {}
    );
  }

  deleteItemFromCart(index) {
    const updatedCart = [...this.cart];
    updatedCart.splice(index, 1);
    this.cart = updatedCart;
    const updatedCartAsJSON = JSON.stringify(updatedCart);
    localStorage.setItem('cart', updatedCartAsJSON);
  }

  emptyCart() {
    const emptyCart = [];
    this.cart = emptyCart;
    const emptyCartAsJSON = JSON.stringify(emptyCart);
    localStorage.setItem('cart', emptyCartAsJSON);
  }
}
