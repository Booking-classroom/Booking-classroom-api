import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto) {
    console.log('first');
    const user = await this.userService.findOneByEmail(signinDto.email);

    if (!user) {
      console.log('second');
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordCorrect = await bcrypt.compare(signinDto.password, user.password);  

    if (!isPasswordCorrect) {
      console.log('third');
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    console.log(payload)
    const access_token = this.jwtService.sign(payload);

    console.log(access_token)
    return { access_token };
  }

  async signup(signupDto: SignupDto) { 
    
    if (!signupDto.password) {
      throw new Error('Password is required');
    }

    const user = await this.userService.findOneByEmail(signupDto.email);
    if (user) {
      throw new Error('User with this email already exists');
    }

    const password = await bcrypt.hash(signupDto.password, 10);
    signupDto.password = password;
    return this.userService.create(signupDto);
  }
}
