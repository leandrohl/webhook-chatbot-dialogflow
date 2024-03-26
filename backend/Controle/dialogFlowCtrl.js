import { obterCardsDoces } from "../Funcoes/DialogFlow/funcoesDialogFlow.js";
import gravarPedido from '../Persistencia/pedidoDAO.js'

export default class DialogFlowCtrl{

    processar(requisicao, resposta){
        resposta.type('application/json');
        //processar intenção 'InicioAtendimento'
        const intencao = requisicao.body.queryResult.intent.displayName;
        const ambienteOrigem = requisicao.body?.originalDetectIntentRequest?.source;
        if (intencao && intencao == 'InicioAtendimento'){
            let respostaDF = { fulfillmentMessages: [] };
            //deveremos construir uma resposta para essa intenção
            if (ambienteOrigem){
                //devolver custom cards
                obterCardsDoces('custom')
                .then((listaCardsCustom)=>{
                    respostaDF['fulfillmentMessages'] = [...listaCardsCustom,
                        {
                            "text": {
                               "text":[
                                    "Gostaria de fazer um pedido?",
                               ]
                            }
                        }
                    ];
                    resposta.json(respostaDF);
                })
                .catch((erro)=>{
                    respostaDF['fulfillmentMessages'] = [
                        {
                            "text": {
                               "text":[
                                    "Erro ao recuperar a lista de doces:\n",
                                    "Não foi possível extrair consultar o menu.",
                                    "Tente novamente mais tarde.",
                                    erro.message
                               ]
                            }
                        }
                    ];
                });
            }
            else{
                //devolver messenger cards
                obterCardsDoces('messenger')
                .then((listaCardsMessenger)=>{
                    respostaDF['fulfillmentMessages'] = [{
                        "payload": {
                            "richContent": [[...listaCardsMessenger, 
                                {
                                    "type":"description",
                                    "title":"Início de atendimento!",
                                    "text":[
                                        "Gostaria de fazer um pedido?"
                                    ]
                                }
                            ]]
                        }
                    }];
                    resposta.json(respostaDF);
                })
                .catch((erro)=>{
                    respostaDF['fulfillmentMessages'] = {
                        "payload": {
                            "richContent": [
                                {
                                    "type":"description",
                                    "title":"Erro ao recuperar a lista de doces",
                                    "text":[
                                        "Infelizmente não foi possível exibir o menu de doces.",
                                        erro.message
                                    ]
                                }
                            ]
                        }
                    }
                });  
            }
        } else if (intencao == 'PedidoDoCliente') {
                //é preciso temporariamente armazenar os doces que estão sendo pedidos
                const sessaoDF = requisicao.body.queryResult.outputContexts?.[0].name.split('/')[4]
                if (!global.sessao){
                    global.sessao = {}
                }
                if (!global.sessao[sessaoDF]) {
                    global.sessao[sessaoDF] = { doces: [], quantidades: [] }
                }
    
    
                if (requisicao.body.queryResult.parameters.doce){
                    global.sessao[sessaoDF].doces = [...global.sessao[sessaoDF].doces, ...requisicao.body.queryResult.parameters.doce];
                }
                if (requisicao.body.queryResult.parameters.quantidade){
                    global.sessao[sessaoDF].quantidades = [...global.sessao[sessaoDF].quantidades, ...requisicao.body.queryResult.parameters.quantidade];
                }

                console.log(global.sessao[sessaoDF].doces)
            }
            else if (intencao == 'PedidoDoCliente - no') {
                //armazenar no banco de dados o pedido do cliente
                const sessaoDF = requisicao.body.queryResult.outputContexts?.[0].name.split('/')[4];
                let respostaDF = { fulfillmentMessages: [] };
                gravarPedido(global.sessao[sessaoDF].quantidades, global.sessao[sessaoDF].doces)
                    .then((numeroPedido) => {
                        console.log("numero do pedido: " + numeroPedido);
                        //apaga os dados da sessão referente a essa conversa
                        delete global.sessao[sessaoDF];
                        if (ambienteOrigem) {
                            respostaDF['fulfillmentMessages'] = [
                                {
                                    "text": {
                                        "text": [
                                            "Seu pedido foi registrado com sucesso!",
                                            "Já começamos o preparo e em breve entregaremos para você.",
                                            "Anote o número do seu pedido: " + numeroPedido,
                                            "Qual o endereço de entrega?"
                                        ]
                                    }
                                }
                            ];
                            resposta.json(respostaDF);
                        }
                        else {
                            respostaDF['fulfillmentMessages'] = {
                                "payload": {
                                    "richContent": [[
                                        {
                                            "type": "description",
                                            "title": "Seu pedido foi registrado com sucesso!",
                                            "text": [
                                                "Já começamos o preparo e em breve entregaremos para você.",
                                                "Anote o número do seu pedido: " + numeroPedido,
                                                "Qual o endereço de entrega?"
                                            ]
                                        }
                                    ]
                                    ]
                                }
                            }
                            resposta.json(respostaDF);
                        }
                    }).catch((erro) => {
                        respostaDF['fulfillmentMessages'] = {
                            "payload": {
                                "richContent": [
                                    {
                                        "type":"description",
                                        "title":"Erro ao salvar pedido",
                                        "text":[
                                            "Infelizmente não foi possível salvar seu pedido de doces.",
                                            erro.message
                                        ]
                                    }
                                ]
                            }
                        }
                        resposta.json(respostaDF);
                    })
            }
    }
}