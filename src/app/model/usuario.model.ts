import { RolModel } from "./rol.model";

export class UsuarioModel {
    public username!: string;
    public firstname!: string;
    public lastname!: string;
    public email!: string;
    public enabled!: boolean;
    public authorities!: Array<RolModel>;


    constructor(){

    }
}
