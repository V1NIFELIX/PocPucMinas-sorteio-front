import { Produto } from './produto';

export class Cupom {
  id: string;
  razao_social: string;
  dados_empresa: string;
  cnpj: string;
  total_itens: string;
  valor_total: string;
  chave_nota_fiscal: string;
  chave?:string;
  quantidade_cupons: string;
  data_emissao: string;
  user: string;
  vouchers?: any;
  dt_cadastro:any
  cpf:any;
  produtos: Array<Produto>
}
