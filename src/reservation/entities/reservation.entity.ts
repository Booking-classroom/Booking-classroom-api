import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "../../Generic/timestamp.entity";

export enum Etat {
    CONFIRMEE = 'confirmée',
    EN_ATTENTE = 'en attente',
    ANNULEE = 'annulée',
    TERMINEE = 'terminée'
}


@Entity('reservation')
export class ReservationEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })  
    id_user: number;

    @Column({ type: 'int', nullable: false })  
    id_classroom: number;

    @Column({ type: 'date', nullable: false })
    date: Date;

    @Column({ type: 'time', nullable: false })
    start_time: string;

    @Column({ type: 'time', nullable: false })
    end_time: string;

    @Column({ type: 'enum', enum: Etat, nullable: false })
    etat: Etat;
    
}