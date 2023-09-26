import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProdutoDummy } from '../model/ProdutoDummy';
import { Paginacao } from '../model/Paginacao';
import { Carrinho } from '../model/Carrinho';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoProdutoService {
  readonly url ="http://127.0.0.1:5000";

  constructor(private client: HttpClient) { 
   
  }

  deleteById(idProduto: number){
    return this.client.delete<Produto>(this.url + `/carrinho-produto?id=${idProduto}`);
  }
 
  update(produto: Produto){
    return this.client.put<Produto>(this.url + `/carrinho-produto`, produto);
  }

}
