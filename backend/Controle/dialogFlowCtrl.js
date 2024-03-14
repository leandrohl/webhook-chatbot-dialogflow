import { obterCardsDoces } from "../Funcoes/DialogFlow/funcoesDialogFlow.js";

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
                    respostaDF['fulfillmentMessages'] = listaCardsCustom;
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
                            "richContent": [listaCardsMessenger]
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
         
        }
    }
}