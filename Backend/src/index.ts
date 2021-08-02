import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import usuarioRoutes from './routes/usuarioRoutes';
import sexoRoutes from './routes/sexoRoutes';
import departamentoRoutes from './routes/departamentoRoutes';
import clasificadorRoutes from './routes/clasificadorRoutes';
import RespuestaLegalRoutes from './routes/RespuestaLegalRouter';
import boletaRoutes from './routes/BoletaRoutes';
import authRoutes from './routes/AuthRoutes';
import reportRoutes from './routes/ReportRoutes';
class Server {
    public app:Application;
    constructor(){
        this.app=express();
        this.config();
        this.route();

    }
    config():void{
        this.app.set('port',process.env.PORT || 4000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(bodyParser.json());

        this.app.use(express.urlencoded({extended:false}));

    }
    route():void{
        this.app.use('/backend/Sexo',sexoRoutes);
        this.app.use('/backend/Departamento',departamentoRoutes);
        this.app.use('/backend/Clasificador',clasificadorRoutes);
        this.app.use('/backend/Boleta',boletaRoutes);
        this.app.use('/backend/RespuestaLegal',RespuestaLegalRoutes);
        this.app.use('/backend/Usuario',usuarioRoutes);
        this.app.use('/backend/Auth',authRoutes);
        this.app.use('/backend/Reports',reportRoutes);
    }

    start():void{
        this.app.listen(this.app.get('port'),() =>{
            console.log("Server on port",this.app.get('port'));
        });
    }
}

const server=new Server();
server.start();
