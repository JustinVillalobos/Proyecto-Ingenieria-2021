import {Router} from 'express';
import { respuestaLegalController} from '../controllers/RespuestaLegalController';

class RespuestaLegalRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',respuestaLegalController.list);
        this.router.get('/select_by_id',respuestaLegalController.selectById);
        this.router.get('/delete',respuestaLegalController.delete);
        this.router.post('/update',respuestaLegalController.update);
        this.router.post('/insert',respuestaLegalController.insert);
    }
}
const respuestaLegalRoutes=new RespuestaLegalRoutes();
export default respuestaLegalRoutes.router;