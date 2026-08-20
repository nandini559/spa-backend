import {
  Body,
  Delete,
  Patch,
  Param,
  Post,
  Req,
  UseGuards
} from "@nestjs/common";
import {Controller, Get, Request} from "@nestjs/common";
import {RecordService} from "./record.service";
import {CreateRecordDto} from "./dto/create-record.dto";
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth} from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("records")
export class RecordController {
  constructor(private readonly recordService : RecordService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  create(@Body()dto : CreateRecordDto) {
    console.log("CREATE DTO:", dto);
    return this.recordService.create(dto);
  }
  @UseGuards(AuthGuard("jwt"))
  @Get()
  findAll(@Req()req : any) {
    console.log("JWT User:", req.user);
    return this.recordService.findAll(req.user);
  }

  @Get(":id")
  findOne(@Param("id")id : string) {
    return this.recordService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id")id : string) {
    return this.recordService.delete(id);
  }

  @Patch(":id")
  update(@Param("id")id : string, @Body()data : CreateRecordDto) {
    return this.recordService.update(id, data);
  }
}
