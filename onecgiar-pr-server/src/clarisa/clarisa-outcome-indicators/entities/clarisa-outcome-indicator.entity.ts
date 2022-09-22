import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Auditable } from '../../../shared/entities/auditableEntity';

@Entity('clarisa_outcome_indicators')
export class ClarisaOutcomeIndicator extends Auditable{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'smo_code',
        type: 'text',
        nullable: true
    })
    smo_code: string;

    @Column({
        name: 'outcome_indicator_statement',
        type: 'text',
        nullable: true
    })
    outcome_indicator_statement: string;
}