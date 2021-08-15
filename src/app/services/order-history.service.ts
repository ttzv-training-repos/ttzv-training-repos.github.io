import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OrderHistory } from '../commons/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private endpoint = environment.shopApiUrl;
  private orderUrl = this.endpoint + '/orders'

  constructor(private httpClient: HttpClient) { }

  getOrderHistory(email: string): Observable<OrderHistory[]>{
    let orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${email}`;
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl).pipe(
      map(response => response._embedded.orders)
    );
  }
}

interface GetResponseOrderHistory{
  _embedded:{
    orders: OrderHistory[];
  }
}
