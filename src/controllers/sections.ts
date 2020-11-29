import { validate } from "class-validator";
import { Request, Response } from "express";

import { Section } from "../entity/Section";
import { User } from "../entity/User";

// create section app.post('/sections')
export const createSection = async (req: Request, res: Response) => {
    const {
        userUuid,
        sectionCode,
        sectionName
    } = req.body;

    try {
        const user = await User.findOneOrFail({ uuid: userUuid })
        const section = new Section ({
            user,
            sectionCode,
            sectionName
        })

        const errors = await validate(section);
        if (errors.length > 0) throw errors;

        await section.save();
        return res.status(201).json(section);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    }
}
// get section app.get('/sections')
export const getSections = async(req: Request, res: Response) => {
    try {
        const section = await Section.find({relations: ['user']})
        return res.status(201).json(section);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    }
}

// update section app.put('/sections/:uuid')
export const updateSection = async(req: Request, res: Response) => {
    const uuid = req.params.uuid;
    const { 
        sectionCode,
        sectionName
    } = req.body;

    try {
        const section = await Section.findOneOrFail({ uuid })

        section.sectionCode = sectionCode || section.sectionCode;
        section.sectionName = sectionName || section.sectionName;

        const errors = await validate(section);
        if (errors.length > 0) throw errors;

        await section.save();
        return res.json(section);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    }
}

//delete section app.delete('/sections/:uuid')
export const deleteSection = async(req: Request, res: Response) => {
    const uuid = req.params.uuid;

    try {
        const section = await Section.findOneOrFail({ uuid });
        await section.remove();

        return res.status(201).json(section)
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    } 
}

//find section app.get('/sections/:uuid')
export const getSection = async (req: Request, res: Response) => {
    const uuid = req.params.uuid;

    try {
        const section = await Section.findOneOrFail({ uuid }, {relations: ['user']});
        return res.json(section);
    } catch(err) {
        console.log(err);
        return res.status(404).json({ error: 'ユーザーが見つかりません！'})
    }
}