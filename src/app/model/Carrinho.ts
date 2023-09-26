import { Produto } from "./Produto";

export interface Carrinho{
    id_user: number,
    produtos: Produto[]
}