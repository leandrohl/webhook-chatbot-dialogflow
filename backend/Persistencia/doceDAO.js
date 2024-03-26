import Doce from "../Modelo/doce.js";
import conectar from "./conexao.js";

export default class doceDAO {
    async gravar(doce) {
        if (doce instanceof Doce) {
            const conexao = await conectar();
            const sql = 'INSERT INTO doce (descricao, preco, urlImagem, listaIngredientes) VALUES (?, ?, ?, ?)';
            const parametros = [doce.descricao, doce.preco, doce.urlImagem, doce.listaIngredientes];

            const resultado = await conexao.query(sql, parametros);
            doce.id = resultado[0].insertId;
        }
    }

    async atualizar(doce) {
        if (doce instanceof Doce) {
            const conexao = await conectar();
            const sql = 'UPDATE doce set descricao = ?, preco = ?, urlImagem = ?, listaIngredientes = ?';
            const parametros = [doce.descricao, doce.preco, doce.urlImagem, doce.listaIngredientes];

            await conexao.query(sql, parametros);
        }
    }

    async excluir(doce) {
        if (doce instanceof Doce) {
            const conexao = await conectar();
            const sql = 'DELETE WHERE id = ?';
            const parametros = [doce.id];

            await conexao.query(sql, parametros);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = 'SELECT * FROM doce';

        const [ registros ] = await conexao.query(sql);
        const listaDoces = []

        for (const registro of registros) {
            const doce = new Doce(registro.id, registro.descricao, registro.preco, registro.urlImagem, registro.listaIngredientes);
            listaDoces.push(doce);
        }
        return listaDoces;
    }

    async consultarPorNome(nomeDoce) {
        const conexao = await conectar();
        const sql = 'SELECT * FROM doce where descricao like ?';
        const [registros] = await conexao.query(sql,['%'+nomeDoce+'%']);
        let doce = null;
        for (const registro of registros){
            doce = new Doce(registro.id, registro.descricao, registro.preco, registro.urlImagem, registro.listaIngredientes);
            break;
        }
        return doce;
    }
}