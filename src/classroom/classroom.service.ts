import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassroomEntity } from './entities/classroom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassroomService {
    constructor(
      @InjectRepository(ClassroomEntity)
      private readonly classroomRepository: Repository<ClassroomEntity>,
    ) {}

    
async create(createClassroomDto: CreateClassroomDto): Promise<ClassroomEntity> {
  const classroom = await this.classroomRepository.save(createClassroomDto);

  return classroom;
}

  findAll(): Promise<ClassroomEntity[]> {
    const tasksList = this.classroomRepository.find();
    return tasksList;
  }

  async findOneById(id: number): Promise<ClassroomEntity> {
    const classroom = await  this.classroomRepository
      .createQueryBuilder('classroom')
      .where('classroom.id = :id', {id})
      .getOne();

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    return classroom;
  }

  async findByAvailability(isAvailable: boolean): Promise<ClassroomEntity[]> {
    const classroom = await this.classroomRepository.find({where: {isAvailable}});
    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    return classroom;
  }

  update(id: number, updateClassroomDto: UpdateClassroomDto): Promise<ClassroomEntity> {

    this.classroomRepository.update(id, updateClassroomDto);

    return this.findOneById(id);
  }

  async remove(id: number): Promise<any> {
    await this.findOneById(id);

    const task = this.classroomRepository.softDelete(id);
    return task;
  }
}
