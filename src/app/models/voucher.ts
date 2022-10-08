export class Voucher {
  id?: string;
  codigo: string;
  cupom: string;
  user: string;
  sorteado: boolean;
  retirou_premio: boolean;
  dt_cadastro: string;
  cartaCompromisso?: File;
  reciboEntregaPremio?: File;
}
