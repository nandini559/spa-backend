import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Param,
  Post,
  Req,
  UseGuards
} from "@nestjs/common";

import {RecordService} from "./record.service";
import {CreateRecordDto} from "./dto/create-record.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller("records")
export class RecordController {
  constructor(private readonly recordService : RecordService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  create(@Body()dto : CreateRecordDto, @Req()req) {
    console.log(req.headers.authorization);
    console.log(req.user);
    return this.recordService.create(dto, req.user.id);
  }

  @Get()
  findAll() {
    return this.recordService.findAll();
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
