import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/commons/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { GetResponseProduct, ProductService } from 'src/app/services/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  categoryName: string = "";
  searchMode: boolean = false;

  //pagination props

  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  previousKeyword: string = "";

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if(this.previousKeyword != keyword){
      this.pageNumber = 1
    }

    this.previousKeyword = keyword;

    this.productService.searchProductsPaginate(this.pageNumber - 1, this.pageSize, keyword)
                      .subscribe(this.processResult())
  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.get('id') == null ? false : true;
    if (hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }
    this.productService.getProductCategories().subscribe(
      data => this.categoryName = data[this.currentCategoryId-1].categoryName
    )

    if(this.previousCategoryId != this.currentCategoryId){
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, previousCategoryId=${this.previousCategoryId}, pageno=${this.pageNumber}`)

    this.productService.getProductListPaginate(this.pageNumber - 1, 
                                                this.pageSize, 
                                                this.currentCategoryId)
                                                .subscribe(this.processResult());

  }

  updatePageSize(value: number){
    this.pageSize = value;
    this.pageNumber = 1;
    this.listProducts();
  }

  processResult(){
    return (data: GetResponseProduct) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  addToCart(product: Product){
    console.log(`Adding to cart: ${product.name} `);
    this.cartService.addToCart(new CartItem(product));
  }

 
}
