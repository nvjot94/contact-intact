import express, { Request, Router, Response } from 'express';

const userRouter: Router = express.Router();

userRouter.get('/', async (req: Request, res: Response) => {
    try {
        res.json({ url: req.url, router: "user" });
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});


export default userRouter;



// itemsRouter.put("/", async (req: Request, res: Response) => {
//     try {
//         const item: Item = req.body.item;

//         await ItemService.update(item);

//         res.sendStatus(200);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });