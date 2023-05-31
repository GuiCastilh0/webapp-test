/* eslint-disable @typescript-eslint/indent */
import { Component, Input, OnInit } from '@angular/core';
import { APIProductsRoot } from 'src/app/api-services/products.service.interface';
import { ProductsService } from 'src/app/services/products-service.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
	@Input() tipoDeProduto: string;
  products: APIProductsRoot;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProductsByType(this.tipoDeProduto).subscribe(
			(data: APIProductsRoot) => {
      this.products = data;
			console.log(data);
    });
  }
}
