import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.sass']
})
export class SalesPersonListComponent implements OnInit {

  salesPersonList: SalesPerson[] = [
    new SalesPerson("name","sn","email",5),
    new SalesPerson("name1","sn1","email1",10),
    new SalesPerson("name2","sn2","email2",15)
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
