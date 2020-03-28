import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
//import swaggerInit from './swagger';
//import swaggerUi from 'swagger-ui-express';
class App {
    private httpServer: Application;
    constructor() {
        this.httpServer = express();
        this.httpServer.use(bodyParser.urlencoded({ extended: true }));

        this.httpServer.use(bodyParser.json());
        this.httpServer.get('/', (req: Request, res: Response) => {
            res.send(`url queried is ${req.url}`);
        })
    }

    public start = (port: Number) => {
        return new Promise((resolve, reject) => {
            this.httpServer.listen(port, () => {
                resolve(port);
            }).on('error', (err: object) => reject(err));
        })
    }
};

export default App;

