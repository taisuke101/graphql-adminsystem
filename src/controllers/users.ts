import { validate } from 'class-validator';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { User } from '../entity/User';

//CREATE user app.post('/users')
export const createUser = async(req: Request, res: Response) => {
    let { 
        userId,
        password,
        confirmPassword
    } = req.body;

    try {
        const user = await User.findOne({ userId })
            if (user) {
                throw new Error('すでに存在しているユーザーです！')
            }
            if(password !== confirmPassword) {
                throw new Error('パスワードが一致しません！');
            }

        password = await bcrypt.hash(password, 12)

        const newUser = new User ({ 
            userId,
            password
        })

        const errors = await validate(newUser);
        if (errors.length > 0) throw errors;

        await newUser.save();

        return res.json(newUser);
    } catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
}


//READ app.get('/users')
export const getUsers = async(_: Request, res: Response) => {
    try {
        const user = await User.find({ relations: ['employee', 'section']});
        return res.json(user);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    }
}

//UPDATE app.put('/users/:uuid')
export const updateUser = async(req: Request, res: Response) => {
    const uuid = req.params.uuid;
    let { 
        userId,
        password
    } = req.body;

    try {
        const user = await User.findOneOrFail({ uuid })

        password = await bcrypt.hash(password, 12)

        user.userId = userId || user.userId;
        user.password = password || user.password;

        const errors = await validate(user);
        if (errors.length > 0) throw errors;

        await user.save();
        return res.json(user);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    }
}

//DELETE app.delete('/users/:uuid')
export const deleteUser = async(req: Request, res: Response) => {
    const uuid = req.params.uuid;

    try {
        const user = await User.findOneOrFail({ uuid });
        await user.remove();

        return res.status(201).json(user)
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    } 
}

//FIND app.get('/users/:uuid')
export const getUser = async (req: Request, res: Response) => {
    const uuid = req.params.uuid;

    try {
        const user = await User.findOneOrFail({ uuid }, {relations: ['employee', 'section']});
        return res.json(user);
    } catch(err) {
        console.log(err);
        return res.status(404).json({ employee: 'ユーザーが見つかりません！'})
    }
}
