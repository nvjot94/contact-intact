import express, { Request, Router, Response } from 'express';
import { check, validationResult } from 'express-validator';
const userRouter: Router = express.Router();


userRouter.post('/', [
    check('name', 'Please add the name').not().isEmpty(),
    check('email', "Please include an Email address").isEmail(),
    check('password', 'Please enter a password of more than 6 characters').isLength({ min: 6 })
], async (req: Request, res: Response) => {

    const errors: Array<{}> = validationResult(req).array();

    if (errors.length !== 0) {
        return res.status(400).json({ errors: errors });
    }

    try { }
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