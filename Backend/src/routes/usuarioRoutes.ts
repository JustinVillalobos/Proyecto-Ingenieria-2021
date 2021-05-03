import {Router} from 'express';
import { usuarioController} from '../controllers/usuarioControllers';
class usuarioRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',usuarioController.list);
        this.router.get('/select_by_id',usuarioController.selectById);
        this.router.get('/select_by_sesion',usuarioController.selectBySesion);
         this.router.get('/select_by_cedula_id',usuarioController.selectByCedulaID);
        this.router.get('/delete',usuarioController.delete);
        this.router.post('/update',usuarioController.update);
        this.router.post('/insert',usuarioController.insert);
    }
}

const usuario=new usuarioRoutes();
export default usuario.router;