import {Router} from 'express';
import { authController} from '../controllers/AuthController';

class AuthRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/',authController.selectBySesion);
        this.router.post('/auth',authController.auth);

    }
}
const authRoutes=new AuthRoutes();
export default authRoutes.router;