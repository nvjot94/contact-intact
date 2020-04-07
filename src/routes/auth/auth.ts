import express, { Request, Router, Response } from "express";
import { check, validationResult } from "express-validator";
const authRouter: Router = express.Router();
import bcrypt from "bcryptjs";
import User from "../../database/models/User";
import jwt from "jsonwebtoken";
import config from "config";
import AuthMiddleware from "../../middleware/AuthMiddleware";

// @route get api/auth
// @desc  get logged in user
// @access private

authRouter.get("/", AuthMiddleware, async (req: Request, res: Response) => {
  try {
    let user: any = await User.findById((req as any).user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

authRouter.post(
  "/",
  [
    check("email", "please enter the email").isEmail(),
    check("password", "please enter the password of atleast 6 character long").isLength({ min: 6 })
  ],
  async (req: Request, res: Response) => {
    try {
      const error: Array<{}> = validationResult(req).array();

      if (error.length !== 0) {
        res.status(400).send({ error });
      }
      const { email, password } = req.body;

      let user: any = await User.findOne({ email });
      console.log(user);
      if (!user) {
        res.status(400).json({ msg: "Invalid credentials" });
      }

      const isMatch: boolean = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).send({ msg: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, config.get("jwtToken"), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.send({ token });
      });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

export default authRouter;
