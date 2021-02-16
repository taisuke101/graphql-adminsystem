import { Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import Model from "./Model";
import { User } from "./User";

@ObjectType()
@Entity('sections')
export class Section extends Model {

    @Field(() => String)
    @Column('char', { length: 4 })
    @Length(1, 4)
    sectionCode: string;

    @Field(() => String)
    @Column('varchar', { length: 24 })
    @Length(1, 24)
    sectionName: string;

    @Field(() => User)
    @ManyToOne(() => User, user => user.section, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
}