import { Length } from "class-validator";
import { Column, Entity, ManyToOne } from "typeorm";

import Model from "./Model";
import { User } from "./User";

@Entity('sections')
export class Section extends Model {

    @Column('char', { length: 4, unique: true })
    @Length(1, 4)
    sectionCode: string;

    @Column('varchar', { length: 24 })
    @Length(1, 24)
    sectionName: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;
}