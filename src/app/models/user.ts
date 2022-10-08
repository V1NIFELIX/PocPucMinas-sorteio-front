import { Role } from "./role";

export class User {
  id?: string;
  nome?: string;
  cpf?: string;
  bairro?: string;
  telefone?: string;
  email?: string;
  password?: string;
  role?: Role;
  dt_cadastro?:any;
  termos?:any;
}
