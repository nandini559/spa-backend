import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsEnum, IsOptional, IsString, MinLength} from "class-validator";
import {Role} from "@prisma/client";

export class CreateUserDto {
  @ApiProperty({example: "user@example.com"})
  @IsEmail()
  user_email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({enum: Role, required: false})
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
