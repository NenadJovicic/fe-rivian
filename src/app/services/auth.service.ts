import { Injectable } from '@angular/core';
import { LoginReqDto, LoginResDto } from '../interfaces/login.dto';
import { UserDto } from '../interfaces/user.dto';
import { WebService } from './web.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly webService: WebService) {}

  private _token!: string;
  get token() {
    return this._token;
  }

  private _user!: UserDto;
  get user() {
    return this._user;
  }

  public async login(loginData: LoginReqDto): Promise<void> {
    const response = await this.webService.post<LoginResDto>(
      'auth/login',
      loginData
    );
    this._token = response.token;
    this._user = response.user;
    console.log(response);
  }
}
