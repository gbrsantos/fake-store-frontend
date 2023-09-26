import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProdutoDummy } from '../model/ProdutoDummy';
import { Paginacao } from '../model/Paginacao';
import { Carrinho } from '../model/Carrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  readonly url ="http://127.0.0.1:5000";

  constructor(private client: HttpClient) { 
   
  }

  save(carrinho: Carrinho){
    return this.client.post<Carrinho>(this.url + "/carrinho", carrinho);
  }

  findByIdUser(id_user: number){
    return this.client.get<Carrinho>(this.url + `/carrinho?id_user=${id_user}`);
  }
 
  
  finalizar(carrinho: Carrinho){
    return this.client.post<Carrinho>(this.url + `/carrinho/finalizar`, carrinho);
  }
}
