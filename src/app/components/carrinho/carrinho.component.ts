import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrinho } from 'src/app/model/Carrinho';
import { Produto } from 'src/app/model/Produto';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { CarrinhoProdutoService } from 'src/app/service/carrinho.service copy';
import { range } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit{
  disabledQtd: boolean = false;
  
  count = [1,2,3,4,5,6,7,8,9,10];

  constructor(private carrinhoService : CarrinhoService,
    private carrinhoProdutoService : CarrinhoProdutoService ){
  }
  quantidadeForm = new FormGroup({
    'quantidade': new FormControl(),
  })

  carrinho :  Carrinho
  numeroSelected: number
  ngOnInit(): void {    
    this.buscarProdutos();
  }

  buscarProdutos() {
    const id_user = localStorage.getItem("user_id");
    this.carrinhoService.findByIdUser(Number(id_user)).subscribe({
      next: (value) => {
        this.carrinho = value;
        console.log(value);
      },
    });
  }

  excluirProduto(produto: Produto){
    this.carrinhoProdutoService.deleteById(produto.id).subscribe({
      next: (value) =>{
        this.buscarProdutos();
        alert(`Produto ${value.nome} removido do carrinho com sucesso`)
      }
    })
  }

  atualizarQuantidade(produto: Produto){
    this.disabledQtd= true;
    this.carrinhoProdutoService.update(produto).subscribe({
      next: (value) =>{
        this.buscarProdutos();
        this.disabledQtd = false;
        alert("Quantidade atualizada");
      }
    })
  }

  calcularTotalCompra(){
    let count = 0;
    this.carrinho?.produtos?.forEach(p => {
      count += p.valor * p.quantidade;
    })
    return count;
  }

  finalizarCarrinho(){
    this.carrinhoService.finalizar(this.carrinho).subscribe({
      next: (value) =>{
        this.buscarProdutos();
        let retorno = value as any;
        alert(retorno.mensagem);
      }
    })
  }

}
