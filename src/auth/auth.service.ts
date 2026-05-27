import {BadRequestException, Injectable} from "@nestjs/common";

import {PrismaService} from "../prisma/prisma.service";

import {LoginDto} from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(private prisma : PrismaService) {}

  async login(data : LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: data.userId
      }
    });

    if (!user) {
      throw new BadRequestException("Invalid User ID");
    }

    if (user.password !== data.password) {
      throw new BadRequestException("Invalid Password");
    }

    return {message: "Login Successful", user};
  }
}
