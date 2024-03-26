import Doce from "../Modelo/doce.js";
import conectar from "./conexao.js";

export default async function gravarPedido(qtds, doces){
    const conexao = await conectar();
    const sql = 'INSERT INTO pedido (ped_dataPedido, ped_enderecoEntrega) VALUES (?, ?)';
    const parametros = [new Date(), ''];
    const resultado = await conexao.query(sql, parametros);
    const codigoPedido = resultado[0].insertId;
    for (let i = 0; i < doces.length; i++) {
        //buscar cada doce utilizando o nome do doce para recuperar o id do doce
        let doce = new Doce();
        doce = await doce.consultarPorNome(doces[i]);
        if (doce){
            //código para cadastrar os doces nos itens da tabela pedido_doces
            const sqlItens = 'INSERT INTO pedido_doce (ped_codigo, doce_id, qtd) VALUES (?, ?, ?)';
            const parametrosItem = [codigoPedido, doce.id, qtds[i]];
            await conexao.execute(sqlItens, parametrosItem);
        }
        
    }
    return codigoPedido;
}