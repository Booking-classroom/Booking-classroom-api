import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationMaterialDto } from './dto/create-reservationMaterial.dto';
import { UpdateReservationMaterialDto } from './dto/update-reservationMaterial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationMaterialEntity } from './entities/reservationMaterial.entity';
import { Repository } from 'typeorm';
import { ReservationEntity } from 'src/reservation/entities/reservation.entity';
import { MaterialEntity } from 'src/material/entities/material.entity';

@Injectable()
export class ReservationMaterialService {
    constructor(
      @InjectRepository(ReservationMaterialEntity)
      private readonly reservationMaterialRepository: Repository<ReservationMaterialEntity>,
      @InjectRepository(ReservationEntity)
      private readonly reservationRepository: Repository<ReservationEntity>,
      @InjectRepository(MaterialEntity)
      private readonly materialRepository: Repository<MaterialEntity>,
    ) {}
    

    
async create(createReservationMaterialDto: CreateReservationMaterialDto): Promise<ReservationMaterialEntity> {

  const reservation = await this.reservationRepository.findOne({ where: { id: createReservationMaterialDto.reservation } });
  if (!reservation) {
    throw new NotFoundException('Reservation not found');
  }

  const material = await this.materialRepository.findOne({ where: { id: createReservationMaterialDto.material } });
  if (!material) {
    throw new NotFoundException('Material not found');
  }

  const reservationMaterial = this.reservationMaterialRepository.create({
    ...createReservationMaterialDto,
    reservation: reservation.id,
    material: material.id,
  });

  return this.reservationMaterialRepository.save(reservationMaterial);
}

  findAll(): Promise<ReservationMaterialEntity[]> {
    const tasksList = this.reservationMaterialRepository.find();
    return tasksList;
  }

  async findOneById(id: number): Promise<ReservationMaterialEntity> {
    const reservationMaterial = await  this.reservationMaterialRepository
      .createQueryBuilder('reservationMaterial')
      .where('reservationMaterial.id = :id', {id})
      .getOne();

    if (!reservationMaterial) {
      throw new NotFoundException('ReservationMaterial not found');
    }

    return reservationMaterial;
  }

  async findOneByName(name: string): Promise<ReservationMaterialEntity> {
    const reservationMaterial = await  this.reservationMaterialRepository
      .createQueryBuilder('reservationMaterial')
      .where('reservationMaterial.name = :name', {name})
      .getOne();

      if (!reservationMaterial) {
        throw new NotFoundException('reservationMaterial not found');
      }

    return reservationMaterial;
  }

  update(id: number, updateReservationMaterialDto: UpdateReservationMaterialDto): Promise<ReservationMaterialEntity> {

    this.reservationMaterialRepository.update(id, updateReservationMaterialDto);

    return this.findOneById(id);
  }

  async remove(id: number): Promise<any> {
    await this.findOneById(id);

    const task = this.reservationMaterialRepository.softDelete(id);
    return task;
  }
}
