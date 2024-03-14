import express from "express";
import rotaDoce from './Rotas/rotaDoce.js'

const porta = 3000;
const host = '0.0.0.0';

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use('/doces', rotaDoce)

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
})