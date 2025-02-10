import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  
  username: string;

  email: string;

  password: string;
}