import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ name: 'first_name', type: 'varchar', length: 200 })
    first_name: string;

    @Column({ name: 'last_name', type: 'varchar', length: 200 })
    last_name: string;

    @Column({ name: 'email', type: 'varchar', length: 500 })
    email: string;
}