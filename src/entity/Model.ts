import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@ObjectType()
export default abstract class Model extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => ID!)
    @Column({ type: 'uuid' })
    uuid: string;

    @Field(() => Date!)
    @CreateDateColumn()
    createDatetime: Date;

    @Field(() => Date!)
    @UpdateDateColumn()
    updateDatetime: Date;

    @BeforeInsert()
    createUserId() {
        this.uuid = uuid();
    }

    constructor(model?: Partial<any>) {
        super()
        Object.assign(this, model)
    }

    toJSON() {
        return { ...this, id: undefined }
    }
}