import { Request, Response } from "express";
import bcrypt from 'bcryptjs';

import { User } from "../entity/User";
import generateToken from "../utils/generateToken";

//login user app.post('/login')
export const loginUser = async(req: Request, res: Response) => {
    const {
        userId,
        password
    } = req.body;

    const user = await User.findOne({ userId });
        if(!user) {
            throw new Error('ユーザーが見つかりません！')
        }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('登録情報と一致しません！')
    }

    const token = generateToken(user);
    return res.json({
        ...user,
        token
    });
}