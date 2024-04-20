import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { SignInDTo } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth,guard';
import { LoginDTO } from './dto/login-dto';
import { plainToClass } from 'class-transformer';
import { extractTokenFromHeader } from './utils';
import { RefreshDTO } from './dto/refresh-dto';


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

  @Post('login')
  async login(@Body() login: LoginDTO) {
    const loginDto = plainToClass(LoginDTO, login, {
      excludeExtraneousValues: true,
    });
    return await this.authService.login(loginDto);
  }
  @Post('refresh')
  async refreshToken(@Request() req:Request) {
    const { refreshToken, userIdFromHeader } = extractTokenFromHeader(req)
    const userId = parseInt(userIdFromHeader)
    const dto = new RefreshDTO(refreshToken, userId);
    return await this.authService.getAccessToken(dto)
  }
}
