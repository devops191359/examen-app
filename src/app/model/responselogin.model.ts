import { TokenModel } from "./token.model";

export class ResponseLoginModel {
    public codigo: string;
    public mensaje: string;
    public folio: string;
    public resultado: TokenModel;

    constructor(codigo: string, mensaje: string, folio: string, resultado: TokenModel) {
        this.codigo = codigo;
        this.mensaje = mensaje;
        this.folio = folio;
        this.resultado = resultado
    }

}