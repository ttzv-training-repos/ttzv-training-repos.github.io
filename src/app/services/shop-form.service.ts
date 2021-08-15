import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Country } from '../commons/country';
import { State } from '../commons/state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  private endpoint = environment.shopApiUrl;

  countryUrl: string= this.endpoint + "/countries";
  stateUrl: string= this.endpoint + "/states";

  constructor(private httpClient: HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]>{

    let months: number[] = [];
    for (let month = startMonth; month <= 12; month++) {
      months.push(month);
    }

    return of(months);
  }

  getCreditCardYears(): Observable<number[]>{
    let years: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let index = startYear; index < endYear; index++) {
      years.push(index);
    }
    return of(years);
  }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countryUrl).pipe(
      map(response => response._embedded.countries)
    )
  }

  getStates(countryCode: string): Observable<State[]>{
    const url = `${this.stateUrl}/search/findByCountryCode?code=${countryCode}`;
    return this.httpClient.get<GetResponseStates>(url).pipe(
      map(response => response._embedded.states)
    )
  }

}

interface GetResponseCountries{
  _embedded:{
    countries: Country[];
  }
}

interface GetResponseStates{
  _embedded:{
    states: State[];
  }
}