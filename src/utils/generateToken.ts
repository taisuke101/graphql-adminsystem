import jwt from 'jsonwebtoken';
import { User } from '../entity/User';

//TODO Typegraphqlのミドルウェア化

const generateToken = (user: User) => {
    return jwt.sign({
        id: user.uuid,
        userId: user.userId,
    },
    process.env.SECRET_KEY!, 
    {expiresIn: '24h'});
}

export default generateToken;
