
import jwt from 'jsonwebtoken'

// TODO Typegraphqlのミドルウェア化

export const checkAuth = (context: any) => {
    const authHeader = context.req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if(token) {
            try {
                const user = jwt.verify(token, process.env.SECRET_KEY!);
                return user;
            } catch(err) {
                throw new Error('無効もしくは期限切れのトークンです！');
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]')
    }
    throw new Error('Authentication header must be provided');
}

