/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/semi */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { APIProductsRoot } from '../api-services/products.service.interface';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {
	private baseUrl = 'https://dummyjson.com/products/category/';

	constructor(private http: HttpClient) { }

	public getProductsByType(tipoDeProduto: string): Observable<APIProductsRoot> {
		const url = this.baseUrl + tipoDeProduto;
		return this.http.get<APIProductsRoot>(url)
		.pipe(
			retry(2),
			catchError(this.handleError))
	}

	handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
