import {Router} from 'express';
import { sexoController} from '../controllers/sexoController';
class SexoRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',sexoController.list);
        this.router.get('/select_by_id',sexoController.selectById);
        this.router.get('/delete',sexoController.delete);
        this.router.post('/update',sexoController.update);
        this.router.post('/insert',sexoController.insert);
    }
}
const sexoRoutes=new SexoRoutes();
export default sexoRoutes.router;