import { Router } from 'express';
import DoceCtrl from '../Controle/doceCtrl.js';

const rotaDoce = Router();
const doceControlador = new DoceCtrl();

rotaDoce.get('/', doceControlador.consultar)
rotaDoce.post('/', doceControlador.gravar)
rotaDoce.put('/', doceControlador.atualizar)
rotaDoce.delete('/', doceControlador.atualizar)
rotaDoce.patch('/', doceControlador.atualizar)

export default rotaDoce;