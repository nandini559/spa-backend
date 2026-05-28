import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {PrismaService} from "../prisma/prisma.service";
import {CreateRecordDto} from "../record/dto/create-record.dto";

@Injectable()
export class UserService {
  constructor(private prisma : PrismaService) {}

  create(data : CreateUserDto) {
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

  update(id : string, data : CreateRecordDto) {
    return this.prisma.record.update({where: {
        id
      }, data});
  }
}
