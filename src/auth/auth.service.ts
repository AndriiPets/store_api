import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signin() {
    return { msg: 'i have sign up!' };
  }

  async signup(dto: AuthDto) {
    //generate password hash
    const hash = await argon.hash(dto.password);
    //save new user in the db
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    //return saved user
    return user;
  }
}