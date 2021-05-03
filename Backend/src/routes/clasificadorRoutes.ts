import {Router} from 'express';
import { clasificadorController} from '../controllers/clasificadorController';

class ClasificadorRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',clasificadorController.list);
        this.router.get('/select_by_id',clasificadorController.selectById);
        this.router.get('/delete',clasificadorController.delete);
        this.router.post('/update',clasificadorController.update);
        this.router.post('/insert',clasificadorController.insert);
    }
}
const clasificadorRoutes=new ClasificadorRoutes();
export default clasificadorRoutes.router;