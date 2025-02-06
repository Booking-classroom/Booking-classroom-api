import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  getUser(id: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createTaskDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.save(createTaskDto);
    delete user.password;

    return user;
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    // Recherche d'un utilisateur par email
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      // include password
      .addSelect('user.password')
      .getOne();

    console.log('findOneByEmail : ', user);

    // Vérifier si l'utilisateur n'existe pas
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Retourner l'utilisateur trouvé
    return user;
  }

  async findOneById(id: number): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      //exclide password
      .addSelect('user.password', 'password')
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOneById(id);
    const updateUser = {
      ...user,
      ...updateUserDto,
    };

    await this.userRepository.update(id, updateUser);
    //update
    return updateUser;
  }

  async remove(id: number) {
    await this.findOneById(id);

    return this.userRepository.delete({
      id,
    });
  }
}
