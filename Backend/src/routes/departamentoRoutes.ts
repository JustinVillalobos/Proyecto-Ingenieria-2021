import {Router} from 'express';
import { usuarioController} from '../controllers/usuarioControllers';

class DepartamentoRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        
    }
}
const departamentoRoutes=new DepartamentoRoutes();
export default departamentoRoutes.router;