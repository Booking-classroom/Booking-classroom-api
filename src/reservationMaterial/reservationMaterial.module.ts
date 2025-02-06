import { Module } from '@nestjs/common';
import { ReservationMaterialService } from './reservationMaterial.service';
import { ReservationMaterialController } from './reservationMaterial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationMaterialEntity } from './entities/reservationMaterial.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ReservationMaterialEntity])],
  controllers: [ReservationMaterialController],
  providers: [ReservationMaterialService],
  exports: [ReservationMaterialService],
})
export class ReservationMaterialModule {}
