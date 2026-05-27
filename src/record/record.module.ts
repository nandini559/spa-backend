import {Module} from "@nestjs/common";
import {RecordController} from "./record.controller";
import {RecordService} from "./record.service";
import {PrismaModule} from "../prisma/prisma.module";

@Module({imports: [PrismaModule], controllers: [RecordController], providers: [RecordService]})
export class RecordModule {}
