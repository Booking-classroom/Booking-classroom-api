import { ApiProperty } from "@nestjs/swagger";
import { Etat } from '../entities/reservation.entity';

export class CreateReservationDto {
    @ApiProperty()
    user: number;

    @ApiProperty()
    classroom: number;

    @ApiProperty()
    start_datetime: Date;

    @ApiProperty()
    end_datetime: Date;

    @ApiProperty({ enum: Etat })
    etat: Etat;
}