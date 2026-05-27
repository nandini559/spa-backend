import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsOptional, IsString, MinLength} from "class-validator";
import {Role} from "@prisma/client";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({enum: Role, required: false})
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
