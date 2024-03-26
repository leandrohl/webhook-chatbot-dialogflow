import DoceDAO from "../Persistencia/doceDAO.js";


export default class Doce {
    #id
    #descricao
    #preco
    #urlImagem
    #listaIngredientes

    constructor(id, descricao, preco, urlImagem, listaIngredientes) {
        this.#id = id;
        this.#descricao = descricao
        this.#preco = preco
        this.#urlImagem = urlImagem
        this.#listaIngredientes = listaIngredientes
    }

    get id(){
        return this.#id;
    }
    set id (id) {
        this.#id = id;
    }

    get descricao(){
        return this.#descricao;
    }
    set descricao (descricao) {
        this.#descricao = descricao;
    }

    get preco(){
        return this.#preco;
    }
    set preco (preco) {
        this.#preco = preco;
    }

    get urlImagem(){
        return this.#urlImagem;
    }
    set urlImagem (urlImagem) {
        this.#urlImagem = urlImagem;
    }

    get listaIngredientes(){
        return this.#listaIngredientes;
    }
    set listaIngredientes (listaIngredientes) {
        this.#listaIngredientes = listaIngredientes;
    }

    toJSON(){
        return {
            id: this.id,
            descricao: this.descricao,
            preco: this.preco,
            urlImagem: this.urlImagem,
            listaIngredientes: this.listaIngredientes
        }
    }

    async gravar(){
        const doceDao = new DoceDAO();
        await doceDao.gravar(this);
    }

    async atualizar(){
        const doceDao = new DoceDAO();
        await doceDao.atualizar(this);
    }

    async excluir(){
        const doceDao = new DoceDAO();
        await doceDao.excluir(this);
    }

    async consultar(){
        const doceDao = new DoceDAO();
        return await doceDao.consultar();
    }

    async consultarPorNome(nomeDoce){
        const doceDao = new DoceDAO();
        return await doceDao.consultarPorNome(nomeDoce);
    }
}