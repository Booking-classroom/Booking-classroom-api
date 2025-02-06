import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ default: 'test@test.com' })
  email: string;

  @ApiProperty({ default: 'password' })
  password: string;
}
