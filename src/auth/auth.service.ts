import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";

import {JwtService} from "@nestjs/jwt";

import {PrismaService} from "../prisma/prisma.service";

import {LoginDto} from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(private prisma : PrismaService, private jwtService : JwtService) {}

  async login(data : LoginDto) {
    // Find user by userId
    const user = await this.prisma.user.findUnique({
      where: {
        user_email: data.user_email
      }
    });

    // User not found
    if (!user) {
      throw new BadRequestException("User ID does not exist");
    }

    // Password mismatch
    if (user.password !== data.password) {
      throw new BadRequestException("Incorrect password");
    }

    // Role mismatch
    if (user.role !== data.role) {
      throw new UnauthorizedException(`This account is registered as ${user.role}. Please select the correct role.`);
    }

    // JWT Payload
    const payload = {
      id: user.id,
      user_email: user.user_email,
      role: user.role
    };

    // Generate JWT Token
    const access_token = this.jwtService.sign(payload);

    return {
      message: "Login Successful",

      access_token,

      user: {
        id: user.id,
        user_email: user.user_email,
        name: user.name,
        role: user.role
      }
    };
  }
}
