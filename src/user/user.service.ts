import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {PrismaService} from "../prisma/prisma.service";

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
}
