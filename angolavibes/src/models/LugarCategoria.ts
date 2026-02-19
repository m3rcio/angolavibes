export class LugarCategoria {
    id!: number;
    titulo!: string;
    foto: string;

    constructor(id: number, titulo: string, foto: string) {
        this.id = id;
        this.titulo = titulo;
        this.foto = foto;
    }
}