import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from '../products/product';
import { map } from "rxjs/operators";
import { ProductCategory } from '../products/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductListPaginate(page: number,
                          pageSize: number,
                          categoryId: number): Observable<GetResponseProduct>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
                    + `&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  searchProducts(keyword: string): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(page: number,
                        pageSize: number,
                        keyword: string): Observable<GetResponseProduct>{
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`
                      + `&page=${page}&size=${pageSize}`;;
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const url = 'http://localhost:8080/api/product-category';

    return this.httpClient.get<GetResponseProductCategory>(url).pipe(
      map(response => response._embedded.productCategory)
    )
  }

  getProduct(id: number): Observable<Product> {
    const searchUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Product>(searchUrl);
  }
}

export interface GetResponseProduct {
  _embedded:{
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded:{
    productCategory: ProductCategory[];
  }
}
