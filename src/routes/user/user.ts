import express, { Request, Router, Response } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../../database/models/User";
import jwt from "jsonwebtoken";
import config from "config";

const userRouter: Router = express.Router();

userRouter.post(
  "/",
  [
    check("name", "Please add the name")
      .not()
      .isEmpty(),
    check("email", "Please include an Email address").isEmail(),
    check("password", "Please enter a password of more than 6 characters").isLength({ min: 6 })
  ],
  async (req: Request, res: Response) => {
    const error: Array<{}> = validationResult(req).array();

    if (error.length !== 0) {
      return res.status(400).json({ error: error });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "user already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      user = new User({ name, email, password: await bcrypt.hash(password, salt) });
      user.save();

      const payload: object = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, config.get("jwtToken"), { expiresIn: 360000 }, (err, token) => {
        if (err) {
          console.log(err);
        }
        res.send({ token });
      });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

export default userRouter;
