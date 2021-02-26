import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";

import { Section } from "../entity/Section";
import { User } from "../entity/User";
import { createSectionInput, updateSectionInput } from "../inputs/SectionInput";
import { isAuth } from "../middleware/isAuth";

@Resolver()
export class SectionResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Section)
    async createSection(@Arg('userId') userId: string, @Arg('data') data: createSectionInput){
        try {
            const user = await User.findOne({ userId });
            if (!user)
                throw new UserInputError('ユーザーが見つかりません！');
            
            const newSection = new Section({
                user: user,
                ...data
            })
            
            const section = await newSection.save();
            
            return section;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    
    @UseMiddleware(isAuth)
    @Mutation(() => Section)
    async updateSection(@Arg('userId') userId: string, @Arg('data') data: updateSectionInput) {
        try {
            const section = await Section.findOne({ where: {user: userId}});
            if (!section)
                throw new UserInputError('ユーザーが見つかりません！');
            
            const updatedSection = Object.assign(section, data);

            await updatedSection.save();

            return updatedSection;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    @UseMiddleware(isAuth)
    @Mutation(() => String)
    async deleteSection(@Arg('userId') userId: string) {
        try {
            const section = await Section.findOne({ where: {user: userId}});
            if (!section)
                throw new UserInputError('ユーザーが見つかりません！');
            
            await section.remove();

            return '拠点情報の削除に成功しました！';
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}