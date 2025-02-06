import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "../../Generic/timestamp.entity";
import { ClassroomEntity } from "../../classroom/entities/classroom.entity";

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
    user: number;

    @ManyToOne(() => ClassroomEntity, classroom => classroom.id)
    classroom: ClassroomEntity;

    @Column({ type: 'date', nullable: false })
    start_datetime: Date;

    @Column({ type: 'date', nullable: false })
    end_datetime: Date;

    @Column({ type: 'enum', enum: Etat, nullable: false })
    etat: Etat;
    
}