import express from "express";
import rotaDoce from './Rotas/rotaDoce.js'
import rotaDialogFlow from './Rotas/rotaDialogFlow.js'
import session from "express-session";

const porta = 3000;
const host = '0.0.0.0';

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: 'm1Nh4Ch4v4',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 10 }
}))
app.use(express.static('./Publico'));

app.use('/doces', rotaDoce);
app.use('/dialogflow', rotaDialogFlow);

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
})