import { Module } from '@nestjs/common';
import { ReservationMaterialService } from './reservationMaterial.service';
import { ReservationMaterialController } from './reservationMaterial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationMaterialEntity } from './entities/reservationMaterial.entity';
import { ReservationEntity } from 'src/reservation/entities/reservation.entity';
import { MaterialEntity } from 'src/material/entities/material.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ReservationMaterialEntity, ReservationEntity, MaterialEntity])],
  controllers: [ReservationMaterialController],
  providers: [ReservationMaterialService],
  exports: [ReservationMaterialService],
})
export class ReservationMaterialModule {}
