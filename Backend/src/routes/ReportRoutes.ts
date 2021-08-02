import {Router} from 'express';
import { reportController} from '../controllers/reportController';

class ReportRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',reportController.all);
        this.router.get('/range',reportController.range);
        this.router.get('/rangeg',reportController.rangeg);
        this.router.get('/department',reportController.department);
        this.router.get('/user',reportController.user);
        this.router.get('/theme',reportController.theme);
        this.router.get('/departmentAndDate',reportController.departmentAndDate);
         this.router.get('/userandclasificator',reportController.userandclasificator);
          this.router.get('/resume',reportController.resume);
    }
}
const reportRoutes=new ReportRoutes();
export default reportRoutes.router;