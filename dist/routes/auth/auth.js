"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authRouter = express_1.default.Router();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../../database/models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const AuthMiddleware_1 = __importDefault(require("../../middleware/AuthMiddleware"));
// @route get api/auth
// @desc  get logged in user
// @access private
authRouter.get("/", AuthMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield User_1.default.findById(req.user.id).select("-password");
        res.json(user);
    }
    catch (error) {
        res.status(500).send("Server Error");
    }
}));
authRouter.post("/", [
    express_validator_1.check("email", "please enter the email").isEmail(),
    express_validator_1.check("password", "please enter the password of atleast 6 character long").isLength({ min: 6 })
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const error = express_validator_1.validationResult(req).array();
        if (error.length !== 0) {
            res.status(400).send({ error });
        }
        const { email, password } = req.body;
        let user = yield User_1.default.findOne({ email });
        console.log(user);
        if (!user) {
            res.status(400).json({ msg: "Invalid credentials" });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).send({ msg: "Invalid credentials" });
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jsonwebtoken_1.default.sign(payload, config_1.default.get("jwtToken"), { expiresIn: 360000 }, (err, token) => {
            if (err)
                throw err;
            res.send({ token });
        });
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
exports.default = authRouter;
