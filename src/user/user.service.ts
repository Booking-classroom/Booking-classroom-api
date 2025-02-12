import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ) {
    const user = this.userRepository.create(createUserDto);

    await this.userRepository.save(user);

    return await this.userRepository.save(user);;
  }

  findAll(): Promise<UserEntity[]> {
    const users = this.userRepository.find({
      select: ['id', 'email','username','role'],
    });

    return users;
  }

  async findOneById(id: number): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .addSelect(['user.id', 'user.email', 'user.username', 'user.role'])
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect(['user.id', 'user.email', 'user.password', 'user.username', 'user.role'])
      .getOne();


    if (!user) {
      return null as any;
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {

    this.userRepository.update(id, updateUserDto);

    return this.findOneById(id);
  }

  async remove(id: number) {
    await this.findOneById(id);

    const user = await this.userRepository.softDelete(id);
    return user;

  }
}
