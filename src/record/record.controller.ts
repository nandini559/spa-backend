import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Param,
  Post
} from "@nestjs/common";

import {RecordService} from "./record.service";
import {CreateRecordDto} from "./dto/create-record.dto";

@Controller("records")
export class RecordController {
  constructor(private readonly recordService : RecordService) {}

  @Post()
  create(@Body()dto : CreateRecordDto) {
    return this.recordService.create(dto);
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
