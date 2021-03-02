import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";
import jwt from 'jsonwebtoken';

import { ExpressType } from "../types/ExpressType";

export const isUser: MiddlewareFn<ExpressType> = async ({ context: { req, res } }, next) => {
    const authHeader = req.headers.authorization;

    const token = authHeader!.split('Bearer ')[1];

    const user = jwt.verify(token, process.env.SECRET_KEY!);

    res.locals.user = user;

    return next();
}