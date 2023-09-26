import { Component } from '@angular/core';
import { DummyJsonService } from '../../service/dummy-json.service';
import { OnInit } from '@angular/core';
import { ProdutoDummy } from '../../model/ProdutoDummy';
import { Paginacao } from '../../model/Paginacao';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { Carrinho } from 'src/app/model/Carrinho';
import { converterProdutoDummyParaProdutoBanco } from 'src/app/model/converter/produto-converter';
import { Produto } from 'src/app/model/Produto';
import { CarrinhoService } from 'src/app/service/carrinho.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  readonly user_id = "user_id";
  paginaProdutos: Paginacao<ProdutoDummy, "products">;
  categorias: string[];

  categoriaForm: FormGroup;
  constructor(
    private dummyJsonService: DummyJsonService,
    private carrinhoService: CarrinhoService) {
  }

  ngOnInit() {
    this.buscarTodosProdutos();

    this.dummyJsonService.getAllCategorias().subscribe({
      next: (value) => {
        this.categorias = value?.sort();
      }
    });

    this.categoriaForm = new FormGroup({
      'categoria': new FormControl(),
    })
    this.categoriaForm.get('categoria')?.valueChanges.subscribe(value => {
      this.filtrarPorCategoria(value);
    })

  }

  filtrarPorCategoria(categoria: string) {
    this.dummyJsonService.getProdutosPorCategoria(categoria).subscribe({
      next: (value) => {
        this.paginaProdutos = value;
      }
    });
  }

  adicionarCarrinho(produto: ProdutoDummy) {
    let id: number = Number(localStorage.getItem(this.user_id))
    if (!id) {
      id = Math.floor((Math.random() * 1000) + 1);
      localStorage.setItem(this.user_id, String(id));
    }
    const produtoEntity: Produto = converterProdutoDummyParaProdutoBanco(produto);
    const carrinho: Carrinho = {
      id_user: Number(id),
      produtos: Array.of(produtoEntity)
    }
    console.log(carrinho);
    
    this.carrinhoService.save(carrinho).subscribe({
      next: () => {
        alert("Produto adicionado ao carrinho com sucesso")
      }
    })
  }

  buscarTodosProdutos() {
    this.dummyJsonService.getAllProdutos().subscribe({
      next: (value) => {
        this.paginaProdutos = value;
      }
    });
  }
  limparFiltro() {
    this.categoriaForm.get('categoria')?.setValue('');
    this.buscarTodosProdutos();
  }
}
