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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../../database/models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const userRouter = express_1.default.Router();
userRouter.post("/", [
    express_validator_1.check("name", "Please add the name")
        .not()
        .isEmpty(),
    express_validator_1.check("email", "Please include an Email address").isEmail(),
    express_validator_1.check("password", "Please enter a password of more than 6 characters").isLength({ min: 6 })
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = express_validator_1.validationResult(req).array();
    if (error.length !== 0) {
        return res.status(400).json({ error: error });
    }
    const { name, email, password } = req.body;
    try {
        let user = yield User_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "user already exists" });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        user = new User_1.default({ name, email, password: yield bcryptjs_1.default.hash(password, salt) });
        user.save();
        const payload = {
            user: {
                id: user.id
            }
        };
        jsonwebtoken_1.default.sign(payload, config_1.default.get("jwtToken"), { expiresIn: 360000 }, (err, token) => {
            if (err) {
                console.log(err);
            }
            res.send({ token });
        });
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
exports.default = userRouter;
