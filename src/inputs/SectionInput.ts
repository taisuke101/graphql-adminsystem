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
    @Field()
    sectionCode?: string;

    @Field()
    sectionName?: string;
}