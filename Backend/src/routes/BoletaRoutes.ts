import {Router} from 'express';
import { boletaController } from '../controllers/BoletaController';

class BoletaRoutes {
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',boletaController.list);
        this.router.get('/select_by_id',boletaController.selectById);
        this.router.post('/update',boletaController.update);
        this.router.post('/insert',boletaController.insert);
    }
}
const boletaRoutes=new BoletaRoutes();
export default boletaRoutes.router;