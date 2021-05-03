import {Router} from 'express';
import { departamentoController} from '../controllers/departamentoController';

class DepartamentoRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',departamentoController.list);
        this.router.get('/select_by_id',departamentoController.selectById);
        this.router.get('/delete',departamentoController.delete);
        this.router.post('/update',departamentoController.update);
        this.router.post('/insert',departamentoController.insert);
    }
}
const departamentoRoutes=new DepartamentoRoutes();
export default departamentoRoutes.router;