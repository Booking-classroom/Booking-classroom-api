import { ApiProperty } from "@nestjs/swagger";

export class CreateReservationMaterialDto {
    @ApiProperty()
    reservation: number;

    @ApiProperty()
    material: number;

}