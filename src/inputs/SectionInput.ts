import { Field, InputType } from "type-graphql";

@InputType()
export class createSectionInput {
    @Field()
    sectionCode: string;

    @Field()
    sectionName: string;
}

@InputType()
export class updateSectionInput {
    @Field({ nullable: true })
    sectionCode?: string;

    @Field({ nullable: true })
    sectionName?: string;
}