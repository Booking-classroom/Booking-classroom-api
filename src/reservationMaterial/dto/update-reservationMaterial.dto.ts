import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationMaterialDto } from './create-reservationMaterial.dto';

export class UpdateReservationMaterialDto extends PartialType(CreateReservationMaterialDto) {
    id: number;
}
