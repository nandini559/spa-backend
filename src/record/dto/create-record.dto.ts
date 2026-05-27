import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateRecordDto {
  @ApiProperty({example: "user-uuid"})
  @IsString()
  userId: string;

  @ApiProperty({example: "Passport"})
  @IsString()
  title: string;

  @ApiProperty({example: "ACTIVE"})
  @IsString()
  status: string;

  @ApiProperty({example: "PRIVATE"})
  @IsString()
  access: string;
}
