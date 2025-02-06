import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "../../Generic/timestamp.entity";

export enum Etat {
    NEUF = 'neuf',
    BON = 'bon',
    ABIME = 'abimé',
    DISFONCTIONNEL = 'disfonctionnel'
}

@Entity('material')
export class MaterialEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'enum', enum: Etat, nullable: false })
    etat: Etat;
}