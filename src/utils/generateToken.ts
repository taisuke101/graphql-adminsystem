import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../config';

const generateToken = (user) => {
    return jwt.sign({
        id: user.uuid,
        userId: user.userId,
    },
    SECRET_KEY, 
    {expiresIn: '24h'});
}

export default generateToken;
