import express, { Router, Request, Response } from 'express';

const contactRouter: Router = express.Router();

contactRouter.get('/', async (req: Request, res: Response) => {
    try {
        res.json({ url: req.url, router: 'contact' });
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});
export default contactRouter;