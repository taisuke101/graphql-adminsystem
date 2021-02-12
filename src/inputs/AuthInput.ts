import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
    @Field()
    userId: string;

    @Field()
    password: string;
}