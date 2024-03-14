# webhook-chatbot-dialogflow
Desenvolvimento de Chatbot consumindo respostas de um Webhook (backend).

## Tecnologias utilizadas
- Node.js
- Express
- Mysql
- DialogFlow
- Fulfillment

## Arquitetura
Camada de Modelo:
Modelar a entidade consumida pelo seu chatbot;

Camada de Persistência:
Comunicação com o banco de dados para recuperar dados relativos a entidade de interesse;

Camada de Controle:
Camada responsável por traduzir as requisições vindas do Dialogflow, produzindo respostas adequadas no formato compreendido pelo Dialogflow; 
Processamento das requisições e respostas (HTTP)

## Como executar?
- cd backend
- npm install
- npm start