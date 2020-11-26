import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'

import { SECRET_KEY } from '../config';

export const checkAuth = (context) => {
    const authHeader = context.req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if(token) {
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch(err) {
                throw new Error('無効もしくは期限切れのトークンです！');
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]')
    }
    throw new Error('Authentication header must be provided');
}

