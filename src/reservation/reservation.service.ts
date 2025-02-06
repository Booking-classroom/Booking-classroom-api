import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { ClassroomEntity } from 'src/classroom/entities/classroom.entity';

@Injectable()
export class ReservationService {
    constructor(
      @InjectRepository(ReservationEntity)
      private readonly reservationRepository: Repository<ReservationEntity>,
      @InjectRepository(ClassroomEntity)
      private readonly classroomRepository: Repository<ClassroomEntity>,
    ) {}

    
    async create(createReservationDto: CreateReservationDto): Promise<ReservationEntity> {
      const classroom = await this.classroomRepository.findOne({ where: { id: createReservationDto.classroom } });
      if (!classroom) {
        throw new NotFoundException('Classroom not found');
      }
    
      const reservation = this.reservationRepository.create({
        ...createReservationDto,
        classroom,
      });
    
      return this.reservationRepository.save(reservation);
    }

  findAll(): Promise<ReservationEntity[]> {
    const tasksList = this.reservationRepository.find();
    return tasksList;
  }

  async findOneById(id: number): Promise<ReservationEntity> {
    const reservation = await  this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.id = :id', {id})
      .getOne();

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return reservation;
  }

  async findOneByName(name: string): Promise<ReservationEntity> {
    const reservation = await  this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.name = :name', {name})
      .getOne();

      if (!reservation) {
        throw new NotFoundException('reservation not found');
      }

    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto): Promise<ReservationEntity> {
      const classroom = await this.classroomRepository.findOne({ where: { id: updateReservationDto.classroom } });
      if (!classroom) {
        throw new NotFoundException('Classroom not found');
      }
  
    this.reservationRepository.update(id, {
      ...updateReservationDto,
      classroom,
    });
  
    return this.findOneById(id);
  }
  async remove(id: number): Promise<any> {
    await this.findOneById(id);

    const task = this.reservationRepository.softDelete(id);
    return task;
  }
}
