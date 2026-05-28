import {ApiProperty} from "@nestjs/swagger";
import {Role} from "@prisma/client";
import {IsEnum, IsString} from "class-validator";

export class LoginDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;
}
