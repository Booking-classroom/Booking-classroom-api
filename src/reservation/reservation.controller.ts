import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('reservation')
@UseGuards(AuthGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiBody({ type: CreateReservationDto })
  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.reservationService.findOneById(+id);
  }

  @Get('classroom/:id')
  findByClassroom(@Param('id') id:string) {
    return this.reservationService.findByClassroom(+id)
  }

  @Get('user/:id')
  findByUser(@Param('id') id:string) {
    return this.reservationService.findByUser(+id)
  }

  @ApiBody({ type: UpdateReservationDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
