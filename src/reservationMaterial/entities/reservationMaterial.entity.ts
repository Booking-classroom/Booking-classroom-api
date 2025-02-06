import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "../../Generic/timestamp.entity";

export enum Etat {
    CONFIRMEE = 'confirmée',
    EN_ATTENTE = 'en attente',
    ANNULEE = 'annulée',
    TERMINEE = 'terminée'
}


@Entity('reservationMaterial')
export class ReservationMaterialEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })  
    id_reservation: number;

    @Column({ type: 'int', nullable: false })  
    id_material: number;

}