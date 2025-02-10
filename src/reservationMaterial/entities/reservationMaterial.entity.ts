import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "../../Generic/timestamp.entity";
import { ReservationEntity } from "src/reservation/entities/reservation.entity";
import { MaterialEntity } from "src/material/entities/material.entity";


@Entity('reservationMaterial')
export class ReservationMaterialEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ReservationEntity, reservation => reservation.id)
    reservation: ReservationEntity;

    @ManyToOne(() => MaterialEntity, material => material.id)
    material: MaterialEntity;

}