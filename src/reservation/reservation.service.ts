import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationService {
    constructor(
      @InjectRepository(ReservationEntity)
      private readonly reservationRepository: Repository<ReservationEntity>,
    ) {}

    
async create(createReservationDto: CreateReservationDto): Promise<ReservationEntity> {
  const reservation = await this.reservationRepository.save(createReservationDto);

  return reservation;
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

  update(id: number, updateReservationDto: UpdateReservationDto): Promise<ReservationEntity> {

    this.reservationRepository.update(id, updateReservationDto);

    return this.findOneById(id);
  }

  async remove(id: number): Promise<any> {
    await this.findOneById(id);

    const task = this.reservationRepository.softDelete(id);
    return task;
  }
}
