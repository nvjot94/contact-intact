
import jwt from 'jsonwebtoken';
import config from 'config';
import express, { Request, NextFunction, Response } from 'express';

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token: any = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ "msg": "No token, authorization denied" });
    }
    try {
        const decoded: any = jwt.verify(token, config.get('jwtToken'));
        (req as any).user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ "msg": "Token is not valid" });
    }
}

export default AuthMiddleware;