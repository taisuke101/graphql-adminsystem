import { Field, InputType } from "type-graphql";

@InputType()
export class createUserInput {
    @Field()
    //TODO 1~24文字のバリデーション設定
    userId: string;

    @Field()
    //TODO 1~24文字のバリデーション設定
    password: string;

    @Field()
    confirmPassword: string;
}

@InputType()
export  class updateUserInput {
    @Field({ nullable: true })
     //TODO 1~24文字のバリデーション設定
    userId?: string;

    @Field({ nullable: true })
     //TODO 1~20文字のバリデーション設定
    password?: string;

    @Field({ nullable: true })
    confirmPassword?: string;
}