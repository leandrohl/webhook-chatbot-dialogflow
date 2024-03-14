//url de referência https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger?hl=pt-br

import Doce from "../../Modelo/doce.js";

//Mensagem tem como alvo o DialogFlow Messenger
export function criarMessengerCard() {
    return {
        type: "info",
        title: "",
        subtitle: "",
        image: {
            src: {
                rawUrl: ""
            }
        },
        actionLink: ""
    }
}

//Mensagem do tipo botão para o DialogFlow Messenger
export function criarMessengerButton() {
    return {
        "type": "button",
        "icon": {
            "type": "chevron_right",
            "color": "#FF9800"
        },
        "text": "",
        "link": "",
        "event": {
            "name": "",
            "languageCode": "",
            "parameters": {}
        }
    }
}

//Mensagem do tipo card para um ambiente "CUSTOM (Interface padrão)"
export function criarCustomCard() {
    return {
        card: {
            title: "",
            subtitle: "",
            imageUri: "",
            buttons: [
                {
                    text: "botão",
                    postback: ""
                }
            ]
        }
    }
}

//Função que gerar Cards de doces para o DialogFlow
//Ambiente suportado: "CUSTOM" e "Messenger"
export async function obterCardsDoces(tipo = "custom") { //tipo = "custom" ou "messenger"
    //Recuperar os doces e estilizá-los no formato Card do DialogFlow
    //Alimentar cada card com informações dos doces
    const doce = new Doce();
    const listaDoces = await doce.consultar("");
    const listaCards = [];
    //alt + shift + f --> corrige automaticamente a identação do código
    for (const doce of listaDoces) {
        let card;
        if (tipo == "custom") {
            card = criarCustomCard();
            card['card']['title'] = doce.descricao;
            card['card']['subtitle'] = "Preço: R$" + doce.preco + " \n" + doce.listaIngredientes;
            card['card']['imageUri'] = doce.urlImagem;
            card['card']['buttons'][0]['text'] = "Mais informações";
            card['card']['buttons'][0]['postback'] = "http://unoeste.br"
        }
        else if (tipo == "messenger") {
            card = criarMessengerCard();
            card['title'] = doce.descricao;
            card['subtitle'] = "Preço: R$" + doce.preco + " \n" + doce.listaIngredientes;
            card['image']['src']['rawUrl'] = doce.urlImagem;
            //card.image.src.rawUrl = servico.urlImagem;
            card['actionLink'] = "http://unoeste.br";

        }
        listaCards.push(card);
    }
    return listaCards;
}