import express, { Request, Router, Response } from 'express';
import { check, validationResult } from 'express-validator';
const authRouter: Router = express.Router();
import bcrypt from 'bcryptjs';
import User from '../../database/models/User';
import jwt from 'jsonwebtoken';
import config from 'config';


authRouter.post('/', [check('email', 'please enter the email').isEmail(),
check('password', 'please enter the password of atleast 6 character long').isLength({ min: 6 })], async (req: Request, res: Response) => {
    try {
        const errors: Array<{}> = validationResult(req).array();

        if (errors.length !== 0) {
            res.status(400).send({ errors });
        }
        const { email, password } = req.body;

        let user: any = await User.findOne({ email });

        if (!user) {
            res.status(400).send({ "msg": "Invalid credentials" });
        }

        const isMatch: boolean = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).send({ "msg": "Invalid credentials" });
        }

        const payload =
        {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtToken'), { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.send({ token });
        });
    }


    catch (e) {
        res.status(500).send(e.message);
    }
});


export default authRouter;  