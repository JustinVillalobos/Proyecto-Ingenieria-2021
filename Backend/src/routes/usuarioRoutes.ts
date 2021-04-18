import {Router} from 'express';
import { usuarioController} from '../controllers/usuarioControllers';
class usuarioRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',usuarioController.list);
        

    }
}

const usuario=new usuarioRoutes();
export default usuario.router;