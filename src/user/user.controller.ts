import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards
} from "@nestjs/common";

import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller("users")
export class UserController {
  constructor(private readonly userService : UserService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  getProfile(@Req()req : any) {
    return {message: "JWT Working Successfully", user: req.user};
  }

  @Post()
  create(@Body()dto : CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id")id : string) {
    return this.userService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id")id : string) {
    return this.userService.delete(id);
  }

  @Patch("change-password/:id")
  changePassword(@Param("id")id : string, @Body()body : any) {
    return this.userService.changePassword(id, body);
  }

  @Patch(":id")
  updateUser(@Param("id")id : string, @Body()data : CreateUserDto) {
    return this.userService.update(id, data);
  }
}
