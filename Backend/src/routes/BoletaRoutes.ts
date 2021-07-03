import {Router} from 'express';
const multipart = require('connect-multiparty');

const multipartMiddleware = multipart({
    uploadDir: './build/uploads'

});
import { boletaController } from '../controllers/BoletaController';

class BoletaRoutes {
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',boletaController.list);
        this.router.get('/select_boleta_detalle',boletaController.list_boleta_detalle);
        this.router.get('/select_boleta_respuesta',boletaController.list_boleta_respuesta);
        this.router.get('/select_by_id',boletaController.selectById);
        this.router.get('/select_Boleta_Detalle_by_id',boletaController.selectBoletaDetalleById);
        this.router.get('/select_Boleta_Respuesta_by_id',boletaController.selectBoletaRespuestaById);
        this.router.post('/update',boletaController.update);
        this.router.post('/insert',boletaController.insert);
        this.router.post('/upload',multipartMiddleware,boletaController.upload);
        this.router.get('/select_by_Empleado',boletaController.selectByEmpleado);

    }
}
const boletaRoutes=new BoletaRoutes();
export default boletaRoutes.router;
