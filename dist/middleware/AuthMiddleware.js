"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const AuthMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ "msg": "No token, authorization denied" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.get('jwtToken'));
        req.user = decoded.user;
        next();
    }
    catch (error) {
        return res.status(401).json({ "msg": "Token is not valid" });
    }
};
exports.default = AuthMiddleware;
