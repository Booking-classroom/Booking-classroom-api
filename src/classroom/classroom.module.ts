import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomEntity } from './entities/classroom.entity';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
      TypeOrmModule.forFeature([ClassroomEntity]),
      UserModule,
  ],
  controllers: [ClassroomController],
  providers: [ClassroomService],
  exports: [ClassroomService],
})
export class ClassroomModule {}
