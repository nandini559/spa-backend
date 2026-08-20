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
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles.decorator";

@Controller("users")
export class UserController {
  constructor(private readonly userService : UserService) {}

  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Get("profile")
  getProfile(@Req()req : any) {
    return {message: "JWT Working Successfully", user: req.user};
  }

  @Post()
  @Roles("ADMIN")
  create(@Body()dto : CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  @Roles("ADMIN")
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
  @Roles("ADMIN")
  updateUser(@Param("id")id : string, @Body()data : CreateUserDto) {
    return this.userService.update(id, data);
  }
}
