import { AuthenticationError } from "apollo-server-express";
import { Request } from "express";
import { MiddlewareFn } from "type-graphql";

interface MiddlewareType {
    req: Request
}

export const isAuth: MiddlewareFn<MiddlewareType> = async({ context: { req }}, next) => {
    if (!req.headers.authorization)
        throw new AuthenticationError('認証されていません！')
    
    return next();
}