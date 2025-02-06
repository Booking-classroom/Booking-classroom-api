import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialEntity } from './entities/material.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MaterialService {
    constructor(
      @InjectRepository(MaterialEntity)
      private readonly materialRepository: Repository<MaterialEntity>,
    ) {}

    
async create(createMaterialDto: CreateMaterialDto): Promise<MaterialEntity> {
  const material = await this.materialRepository.save(createMaterialDto);

  return material;
}

  findAll(): Promise<MaterialEntity[]> {
    const tasksList = this.materialRepository.find();
    return tasksList;
  }

  async findOneById(id: number): Promise<MaterialEntity> {
    const material = await  this.materialRepository
      .createQueryBuilder('material')
      .where('material.id = :id', {id})
      .getOne();

    if (!material) {
      throw new NotFoundException('Material not found');
    }

    return material;
  }

  update(id: number, updateMaterialDto: UpdateMaterialDto): Promise<MaterialEntity> {

    this.materialRepository.update(id, updateMaterialDto);

    return this.findOneById(id);
  }

  async remove(id: number): Promise<any> {
    await this.findOneById(id);

    const task = this.materialRepository.softDelete(id);
    return task;
  }
}
