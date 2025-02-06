import { ApiProperty } from "@nestjs/swagger";
import { Etat } from '../entities/reservation.entity';

export class CreateReservationDto {
    @ApiProperty()
    id_user: number;

    @ApiProperty()
    id_classroom: number;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    start_time: string;

    @ApiProperty()
    end_time: string;

    @ApiProperty({ enum: Etat })
    etat: Etat;
}