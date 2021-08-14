import { StaticSymbolCache } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/commons/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.sass']
})
export class CartDetailsComponent implements OnInit {
  totalPrice: number = 0;
  totalQuantity: number = 0;
  cartItems: CartItem[] = [];
  stock: number[] = []

  constructor(private cartService: CartService) {
    for (let index = 1; index <= 10; index++) {
      this.stock.push(index);
    }
   }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
    this.cartService.computeCartTotals();
  }

  changeQuantity(value: number, cartItem: CartItem){
    cartItem.quantity=value;
    this.cartService.computeCartTotals();
  }

  removeItemFromCart(cartItem: CartItem){
    this.cartService.removeFromCart(cartItem);
    this.cartItems = this.cartService.cartItems;
  }

}
