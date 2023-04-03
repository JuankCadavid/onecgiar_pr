import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../../shared/entities/base-entity';
import { ResultActor } from './result-actor.entity';

@Entity('actor_type')
export class ActorType{

    @PrimaryGeneratedColumn({
        name: 'actor_type_id',
        type: 'bigint'
    })
    actor_type_id: number;

    @Column({
        name: 'name',
        type: 'text',
        nullable: true
    })
    name!: string;

    @OneToMany(() => ResultActor, ra => ra.obj_actor_type)
    result_actor: ResultActor[];
}