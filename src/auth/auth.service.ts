import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto) {
    const user = await this.userService.findOneByEmail(signinDto.email);

    console.log('user :', user);
    console.log('signinDto.password : ', signinDto.password);
    const isPasswordCorrect = await bcrypt.compare(
      signinDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      id: user.id,
    };
    const access_token = await this.jwtService.sign(payload);

    return { access_token };
  }

  async signup(signupDto: SignupDto) {
    const password = await bcrypt.hash(signupDto.password, 10);
    signupDto.password = password;

    return this.userService.create(signupDto);
  }
}
