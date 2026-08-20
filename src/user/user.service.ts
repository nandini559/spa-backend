import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {PrismaService} from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import {ConflictException} from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(private prisma : PrismaService) {}

  async create(data : CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            user_email: data.user_email
          }
        ]
      }
    });

    if (existingUser) {
      throw new ConflictException("User ID or Email already exists");
    }

    return this.prisma.user.create({data});
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        records: true
      }
    });
  }

  findOne(id : string) {
    return this.prisma.user.findUnique({where: {
        id
      }});
  }

  delete(id : string) {
    return this.prisma.user.delete({where: {
        id
      }});
  }

  async changePassword(id : string, body : any) {
    const user = await this.prisma.user.findUnique({where: {
        id
      }});

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== body.currentPassword) {
      throw new Error("Current password incorrect");
    }

    return this.prisma.user.update({
      where: {
        id
      },

      data: {
        password: body.newPassword
      }
    });
  }

  update(id : string, data : CreateUserDto) {
    return this.prisma.user.update({where: {
        id
      }, data});
  }
}
