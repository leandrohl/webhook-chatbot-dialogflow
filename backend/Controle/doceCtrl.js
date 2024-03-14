import Doce from "../Modelo/doce.js"

export default class DoceCtrl {
    gravar(requisicao, resposta){
        resposta.type('application/json')
        if (requisicao.method == 'POST' && requisicao.is('application/json')) {
            const { descricao, preco, urlImagem, listaIngredientes} = requisicao.body;

            if (descricao && preco && urlImagem && listaIngredientes) {
                const doce = new Doce(0, descricao, preco, urlImagem, listaIngredientes);
                doce.gravar()
                .then(() => {
                    resposta.status(201);
                    resposta.json({
                        "status": true,
                        "mensagem": 'Doce gravado com sucesso!'
                    })
                })
                .catch((erro) => {
                    resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": 'Erro ao gravar o doce' + erro.message
                    })
                })
            } else {
                resposta.status(400);
                resposta.json({
                    "status": false,
                    "mensagem": 'Erro ao gravar o doce'
                })
            }
        } else {
            resposta.status(405);
            resposta.json({
                "status": false,
                "mensagem": 'Requisicao Invalida'
            })
        }
    }
    atualizar(requisicao, resposta){}
    excluir(requisicao, resposta){}

    consultar(requisicao, resposta){
        resposta.type('application/json')
        if (requisicao.method == 'GET') {
            const doce = new Doce();
            doce.consultar()
            .then((doces) => {
                resposta.status(201);
                resposta.json(doces)
            })
            .catch(erro => {
                resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": 'Erro ao consultar os doces' + erro.message
                    })
            })
        } else {
            resposta.status(405);
            resposta.json({
                "status": false,
                "mensagem": 'Requisicao Invalida'
            })
        }
    }
}