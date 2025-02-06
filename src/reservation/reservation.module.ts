import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { ClassroomEntity } from 'src/classroom/entities/classroom.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ReservationEntity, ClassroomEntity, UserEntity])],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
