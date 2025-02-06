import { ApiProperty } from "@nestjs/swagger";
import { Etat } from '../entities/material.entity';

export class CreateMaterialDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ enum: Etat })
    etat: Etat;
}