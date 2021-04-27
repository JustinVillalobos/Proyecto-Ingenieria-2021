import {Router} from 'express';
import { usuarioController} from '../controllers/usuarioControllers';
class SexoRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        
    }
}
const sexoRoutes=new SexoRoutes();
export default sexoRoutes.router;