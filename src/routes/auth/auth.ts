import express, { Request, Router, Response } from 'express';

const authRouter: Router = express.Router();

authRouter.get('/', async (req: Request, res: Response) => {
    try {
        res.json({ url: req.url, router: "user" });
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});


export default authRouter;