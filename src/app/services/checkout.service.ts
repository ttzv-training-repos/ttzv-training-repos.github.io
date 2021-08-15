import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Purchase } from '../commons/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private endpoint = environment.shopApiUrl;
  private purchaseUrl = this.endpoint + "/checkout/purchase";
  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }
}
