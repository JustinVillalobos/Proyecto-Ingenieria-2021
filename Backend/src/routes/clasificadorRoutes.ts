import {Router} from 'express';
import { usuarioController} from '../controllers/usuarioControllers';

class ClasificadorRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        
    }
}
const clasificadorRoutes=new ClasificadorRoutes();
export default clasificadorRoutes.router;