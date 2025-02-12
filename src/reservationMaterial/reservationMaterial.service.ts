import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
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

  private async validateReservationMaterial(reservationId: number, materialId: number): Promise<{ reservation: ReservationEntity, material: MaterialEntity }> {
    const reservation = await this.reservationRepository.findOne({ where: { id: reservationId } });
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    const material = await this.materialRepository.findOne({ where: { id: materialId } });
    if (!material) {
      throw new NotFoundException('Material not found');
    }

    const overlappingReservations = await this.reservationMaterialRepository.createQueryBuilder('reservationMaterial')
      .innerJoinAndSelect('reservationMaterial.reservation', 'reservation')
      .where('reservationMaterial.material = :materialId', { materialId: material.id })
      .andWhere('reservation.start_datetime < :endDatetime', { endDatetime: reservation.end_datetime })
      .andWhere('reservation.end_datetime > :startDatetime', { startDatetime: reservation.start_datetime })
      .getMany();

    if (overlappingReservations.length > 0) {
      throw new ConflictException('Material is already reserved in another classroom at the same time');
    }

    return { reservation, material };
  }

  async create(createReservationMaterialDto: CreateReservationMaterialDto): Promise<ReservationMaterialEntity> {
    const { reservation, material } = await this.validateReservationMaterial(createReservationMaterialDto.reservation, createReservationMaterialDto.material);

    const reservationMaterial = this.reservationMaterialRepository.create({
      ...createReservationMaterialDto,
      reservation,
      material,
    });

    return this.reservationMaterialRepository.save(reservationMaterial);
  }

  async update(id: number, updateReservationMaterialDto: UpdateReservationMaterialDto): Promise<ReservationMaterialEntity> {
    if (!updateReservationMaterialDto.reservation) {
      throw new BadRequestException('Reservation is required');
    }
  
    if (!updateReservationMaterialDto.material) {
      throw new BadRequestException('Material is required');
    }
    
    const { reservation, material } = await this.validateReservationMaterial(updateReservationMaterialDto.reservation, updateReservationMaterialDto.material);

    await this.reservationMaterialRepository.update(id, {
      ...updateReservationMaterialDto,
      reservation,
      material,
    });

    return this.findOneById(id);
  }

  findAll(): Promise<ReservationMaterialEntity[]> {
    return this.reservationMaterialRepository.find();
  }

  async findOneById(id: number): Promise<ReservationMaterialEntity> {
    const reservationMaterial = await this.reservationMaterialRepository
      .createQueryBuilder('reservationMaterial')
      .where('reservationMaterial.id = :id', { id })
      .getOne();

    if (!reservationMaterial) {
      throw new NotFoundException('ReservationMaterial not found');
    }

    return reservationMaterial;
  }

  async remove(id: number): Promise<any> {
    await this.findOneById(id);

    const reservationMaterial = this.reservationMaterialRepository.softDelete(id);
    return reservationMaterial;
  }
}