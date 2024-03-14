import { Router } from 'express';
import DialogFlowCtrl from '../Controle/dialogFlowCtrl.js';

const rotaDialogFlow = new Router();
const dfCtrl = new DialogFlowCtrl();

rotaDialogFlow.post('/', dfCtrl.processar);

export default rotaDialogFlow;