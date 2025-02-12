import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { ClassroomEntity } from 'src/classroom/entities/classroom.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
    @InjectRepository(ClassroomEntity)
    private readonly classroomRepository: Repository<ClassroomEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private async validateReservation(createReservationDto: CreateReservationDto, classroom: ClassroomEntity, user: UserEntity): Promise<void> {
    const newReservationStart = new Date(createReservationDto.start_datetime);
    const newReservationEnd = new Date(createReservationDto.end_datetime);
    const dateNow = new Date(Date.now());

    if (newReservationStart.getTime() === newReservationEnd.getTime()) {
      throw new ConflictException('Start time and end time cannot be the same');
    }

    if (newReservationStart < dateNow || newReservationEnd < dateNow) {
      throw new ConflictException('Reservation cannot start or end before the current date and time');
    }

    if (newReservationStart >= newReservationEnd) {
      throw new ConflictException('Start time must be before end time');
    }

    const reservations = await this.reservationRepository.createQueryBuilder('reservation')
      .where('reservation.classroom = :classroom', { classroom: classroom.id })
      .getMany();

    const conflictingReservation = reservations.find(reservation => {
      const reservationStart = new Date(reservation.start_datetime);
      const reservationEnd = new Date(reservation.end_datetime);

      console.log("reservation.start_datetime : ", newReservationStart, reservationStart);
      console.log("reservation.end_datetime : ", newReservationEnd, reservationEnd);

      return (
        newReservationEnd > reservationStart && // New reservation ends after the existing one starts
        newReservationStart < reservationEnd    // New reservation starts before the existing one ends
      );
    });

    if (conflictingReservation) {
      throw new ConflictException(`Classroom is not available at the requested time. Conflicting reservation from ${conflictingReservation.start_datetime} to ${conflictingReservation.end_datetime}`);
    }
  }

  async create(createReservationDto: CreateReservationDto): Promise<ReservationEntity> {
    const classroom = await this.classroomRepository.findOne({ where: { id: createReservationDto.classroom } });
    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    const user = await this.userRepository.findOne({ where: { id: createReservationDto.user } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.validateReservation(createReservationDto, classroom, user);

    const reservation = this.reservationRepository.create({
      ...createReservationDto,
      classroom,
      user,
    });

    return this.reservationRepository.save(reservation);
  }

  async update(id: number, updateReservationDto: UpdateReservationDto): Promise<ReservationEntity> {
    const classroom = await this.classroomRepository.findOne({ where: { id: updateReservationDto.classroom } });
    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    const user = await this.userRepository.findOne({ where: { id: updateReservationDto.user } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  

    await this.validateReservation(updateReservationDto as CreateReservationDto, classroom, user);

    await this.reservationRepository.update(id, {
      ...updateReservationDto,
      classroom,
      user,
    });

    return this.findOneById(id);
  }

  async findAll(): Promise<ReservationEntity[]> {
   const reservation = await this.reservationRepository.find();
   console.log('reservation: ', reservation);
    return reservation;
  }

  async findOneById(id: number): Promise<ReservationEntity> {
    const reservation = await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.id = :id', { id })
      .getOne();

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return reservation;
  }

  async findByClassroom(id: number): Promise<ReservationEntity[]> {
    const classroom = await this.classroomRepository.findOne({ where: { id } });
    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

const reservations = await this.reservationRepository.createQueryBuilder('reservation')
.where('reservation.classroomId = :classroom', { classroom: id })
.getMany();

return reservations;
  }

  async findByUser(id: number): Promise<ReservationEntity[]> {
    const user = await this.userRepository.findOne({ where: { id }});
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const reservations = await this.reservationRepository.find({ where: { user }});
    return reservations;
  }

  async remove(id: number): Promise<any> {
    await this.findOneById(id);

    const task = this.reservationRepository.softDelete(id);
    return task;
  }
}