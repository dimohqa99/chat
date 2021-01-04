import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Post,
  Get,
  Res,
  Request,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { response, Response } from 'express';
import { User } from '../../schemas/user.schema';
import { Public } from '../../helpers/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private UserService: UserService,
    private AuthService: AuthService,
  ) {}

  @Public()
  @Post('/registration')
  async registration(@Body() user: User) {
    await this.UserService.create(user);
  }

  @Public()
  @Post('/login')
  @HttpCode(200)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.UserService.findUserByEmail(email);

    if (!user) {
      throw new ForbiddenException('User was not found');
    }

    const passwordIsCorrect = await this.AuthService.checkCorrectPassword(
      password,
      user.password,
    );

    if (!passwordIsCorrect) {
      throw new ForbiddenException('Password is not correct');
    }

    const token = await this.AuthService.generateJwtToken(user.id);

    const refreshToken = await this.AuthService.createRefreshToken(user.id);

    response.cookie('token', token, {
      httpOnly: true,
    });

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });

    return { userId: user.id };
  }

  // TODO: тут не определен userId, поэтому создается рандомный jwt без userId. Добавить auth
  @Get('updateToken')
  async updateToken(
    @Request() req: { userId: string },
    @Res() response: Response,
  ) {
    const token = await this.AuthService.generateJwtToken(req.userId);

    response.cookie('token', token, {
      httpOnly: true,
    });

    return true;
  }
}
