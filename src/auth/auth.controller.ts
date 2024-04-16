import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { SignInDTo } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth,guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() siginDTO: SignInDTo) {
    return this.authService.signIn(siginDTO.username, siginDTO.password);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('signup')
  async signup(@Body() siginDTO: SignInDTo) {
    return await this.authService.signUp(siginDTO);
  }
}
