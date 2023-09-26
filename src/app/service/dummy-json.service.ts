import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProdutoDummy } from '../model/ProdutoDummy';
import { Paginacao } from '../model/Paginacao';

@Injectable({
  providedIn: 'root'
})
export class DummyJsonService {
  readonly url ="https://dummyjson.com";

  constructor(private client: HttpClient) { 
   
  }

  getAllProdutos(){
    return this.client.get<Paginacao<ProdutoDummy, "products">>(this.url + "/products");
  }

  getAllCategorias(){
    return this.client.get<string[]>(this.url + "/products/categories");
  }

  getProdutosPorCategoria(categoria: string){
    return this.client.get<Paginacao<ProdutoDummy, "products">>(this.url + `/products/category/${categoria}`);
  }
}
