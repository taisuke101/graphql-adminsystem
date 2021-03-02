import { AuthenticationError } from "apollo-server-express";
import { MiddlewareFn } from "type-graphql";

import { IsAuthType } from "../types/IsAuthType";

export const isAuth: MiddlewareFn<IsAuthType> = async({ context: { req }}, next) => {
    if (!req.headers.authorization)
        throw new AuthenticationError('認証されていません！');
    
    return next();
}