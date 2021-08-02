"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const sexoRoutes_1 = __importDefault(require("./routes/sexoRoutes"));
const departamentoRoutes_1 = __importDefault(require("./routes/departamentoRoutes"));
const clasificadorRoutes_1 = __importDefault(require("./routes/clasificadorRoutes"));
const RespuestaLegalRouter_1 = __importDefault(require("./routes/RespuestaLegalRouter"));
const BoletaRoutes_1 = __importDefault(require("./routes/BoletaRoutes"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const ReportRoutes_1 = __importDefault(require("./routes/ReportRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.route();
    }
    config() {
        this.app.set('port', process.env.PORT || 4000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(body_parser_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    route() {
        this.app.use('/backend/Sexo', sexoRoutes_1.default);
        this.app.use('/backend/Departamento', departamentoRoutes_1.default);
        this.app.use('/backend/Clasificador', clasificadorRoutes_1.default);
        this.app.use('/backend/Boleta', BoletaRoutes_1.default);
        this.app.use('/backend/RespuestaLegal', RespuestaLegalRouter_1.default);
        this.app.use('/backend/Usuario', usuarioRoutes_1.default);
        this.app.use('/backend/Auth', AuthRoutes_1.default);
        this.app.use('/backend/Reports', ReportRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port", this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
