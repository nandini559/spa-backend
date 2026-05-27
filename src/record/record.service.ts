import {Injectable} from "@nestjs/common";
import {CreateRecordDto} from "./dto/create-record.dto";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class RecordService {
  constructor(private prisma : PrismaService) {}

  create(data : CreateRecordDto) {
    return this.prisma.record.create({data});
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
}
