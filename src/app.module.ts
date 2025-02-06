import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import  { ConfigModule } from '@nestjs/config';
import { ClassroomModule } from './classroom/classroom.module';
import { MaterialModule } from './material/material.module';
import { ReservationModule } from './reservation/reservation.module';
import { ReservationMaterialModule } from './reservationMaterial/reservationMaterial.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
    }),
    ClassroomModule,
    MaterialModule,
    ReservationModule,
    ReservationMaterialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
