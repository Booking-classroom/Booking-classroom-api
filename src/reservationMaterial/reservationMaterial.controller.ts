import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationMaterialService } from './reservationMaterial.service';
import { CreateReservationMaterialDto } from './dto/create-reservationMaterial.dto';
import { UpdateReservationMaterialDto } from './dto/update-reservationMaterial.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('reservationMaterial')
export class ReservationMaterialController {
  constructor(private readonly reservationMaterialService: ReservationMaterialService) {}

  @ApiBody({ type: CreateReservationMaterialDto })
  @Post()
  create(@Body() createReservationMaterialDto: CreateReservationMaterialDto) {
    return this.reservationMaterialService.create(createReservationMaterialDto);
  }

  @Get()
  findAll() {
    return this.reservationMaterialService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.reservationMaterialService.findOneById(+id);
  }

  @ApiBody({ type: UpdateReservationMaterialDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationMaterialDto: UpdateReservationMaterialDto) {
    return this.reservationMaterialService.update(+id, updateReservationMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationMaterialService.remove(+id);
  }
}
