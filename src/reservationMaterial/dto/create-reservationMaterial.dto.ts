import { ApiProperty } from "@nestjs/swagger";
import { Etat } from '../entities/reservationMaterial.entity';

export class CreateReservationMaterialDto {
    @ApiProperty()
    id_reservation: number;

    @ApiProperty()
    id_material: number;

}