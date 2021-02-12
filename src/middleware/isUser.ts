import { Request, Response } from "express";
import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";
import jwt from 'jsonwebtoken';

interface MiddlewareType {
    req: Request
    res: Response
}

export const isUser: MiddlewareFn<MiddlewareType> = async ({ context: { req, res } }, next) => {
    const authHeader = req.headers.authorization;

    const token = authHeader!.split('Bearer ')[1];

    const user = jwt.verify(token, process.env.SECRET_KEY!);

    res.locals.user = user;

    return next();
}