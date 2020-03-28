import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Application } from 'express';


const swaggerInit = (app: Application) => {
    const swaggerDefinition: Object = {
        info: {
            title: 'Scheduler API',
            version: '1.0.0',
            description: 'Endpoints to the Scheduler application',
        },
        basePath: '/'
    };

    const options: Object = {
        swaggerDefinition,
        apis: ['./server.ts'],
    };

    const swaggerSpec = swaggerJSDoc(options);

    app.get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(options));
};

export default swaggerInit;








