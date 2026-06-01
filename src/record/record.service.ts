import {Injectable} from "@nestjs/common";
import {CreateRecordDto} from "./dto/create-record.dto";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class RecordService {
  constructor(private prisma : PrismaService) {}

  create(dto : CreateRecordDto, userId : string) {
    return this.prisma.record.create({
      data: {
        ...dto,
        userId: userId
      }
    });
  }

  findAll() {
    return this.prisma.record.findMany({
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
