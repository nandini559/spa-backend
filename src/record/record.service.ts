import {Injectable} from "@nestjs/common";
import {CreateRecordDto} from "./dto/create-record.dto";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class RecordService {
  constructor(private prisma : PrismaService) {}

  create(dto : CreateRecordDto) {
    return this.prisma.record.create({
      data: {
        ...dto
      }
    });
  }

  findAll(user : any) {
    console.log("Logged in user:", user);

    if (user.role === "ADMIN") {
      console.log("Fetching all records because user is ADMIN");

      return this.prisma.record.findMany({
        include: {
          user: true
        }
      });
    }

    console.log("Fetching records for user ID:", user.id);

    return this.prisma.record.findMany({
      where: {
        userId: user.id
      },
      include: {
        user: true
      }
    });
  }
  findOne(id : string) {
    return this.prisma.record.findUnique({where: {
        id
      }});
  }

  delete(id : string) {
    return this.prisma.record.delete({where: {
        id
      }});
  }

  update(id : string, data : CreateRecordDto) {
    return this.prisma.record.update({where: {
        id
      }, data});
  }
}
