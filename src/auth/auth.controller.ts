import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards
} from "@nestjs/common";

import {AuthService} from "./auth.service";

import {LoginDto} from "./dto/login.dto";
import {ApiBearerAuth} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService : AuthService) {}

  @Post("login")
  login(@Body()dto : LoginDto) {
    return this.authService.login(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  getProfile(@Req()req) {
    console.log(req.headers);
    console.log(req.user);

    return req.user;
  }
}
