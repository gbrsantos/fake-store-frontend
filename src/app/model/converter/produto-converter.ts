import { Produto } from "../Produto";
import { ProdutoDummy } from "../ProdutoDummy";

export function converterProdutoDummyParaProdutoBanco(produto: ProdutoDummy){
  const novoProduto: Produto = {
    id: 0,
    id_produto: produto.id,
    nome : produto.title,
    quantidade : 1,
    valor : produto.price,
    imagem : produto.thumbnail
  }
  return novoProduto;
}
