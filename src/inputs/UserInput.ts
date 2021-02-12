import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class createUserInput {
    @Field()
    @Length(1, 24, { message: 'ユーザーIDは1~24文字以内で設定してください！'})
    userId: string;

    @Field()
    @Length(1, 20, { message: 'パスワードは1~20文字以内で設定してください！'})
    password: string;

    @Field()
    confirmPassword: string;
}

@InputType()
export  class updateUserInput {
    @Field({ nullable: true })
    @Length(1, 24, { message: 'ユーザーIDは1~24文字以内で設定してください！'})
    userId?: string;

    @Field({ nullable: true })
    @Length(1, 20, { message: 'パスワードは1~20文字以内で設定してください！'})
    password?: string;

    @Field({ nullable: true })
    confirmPassword?: string;
}