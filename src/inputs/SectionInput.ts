import { IsNotEmpty, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class createSectionInput {
    @Field()
    @IsNotEmpty({ message: '拠点コードは必須項目です！' })
    @MaxLength(4, { message: '4文字以内に収めて下さい！'})
    sectionCode: string;

    @Field()
    @IsNotEmpty({ message: '拠点名は必須項目です！' })
    @MaxLength(24, { message: '24文字以内に収めて下さい！'})
    sectionName: string;
}

@InputType()
export class updateSectionInput {
    @Field({ nullable: true })
    sectionCode?: string;

    @Field({ nullable: true })
    sectionName?: string;
}