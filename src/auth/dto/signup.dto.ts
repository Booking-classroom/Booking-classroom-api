import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {

  username: string;

  email: string;

  password: string;
}
