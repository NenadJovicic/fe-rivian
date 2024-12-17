import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { LoginReqDto, LoginResDto } from '../interfaces/login.dto';
import { UserDto } from '../interfaces/user.dto';
import { WebService } from './web.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly webService: WebService,
    private readonly router: Router
  ) {}

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
  }

  public async isLoggedIn(): Promise<boolean> {
    if (!this.token || this.isExpiredToken(this.token)) {
      try {
        await this.refreshToken();
      } catch (error) {
        return false;
      }
    }
    return true;
  }

  private async refreshToken(): Promise<void> {
    const response = await this.webService.get<LoginResDto>(
      'auth/refresh-token'
    );
    this._token = response.token;
    this._user = response.user;
    this.setTimeoutForRefreshingToken();
  }

  private isExpiredToken(token: string): boolean {
    const currentTime: number = new Date().getTime();
    const tokenExpireTime: number = (jwtDecode(token).exp as number) * 1000;
    return currentTime > tokenExpireTime;
  }

  private setTimeoutForRefreshingToken(): void {
    const decodedToken = jwtDecode(this.token);
    // refresh it 5s before it expires
    const timeoutForRequest: number =
      (decodedToken.exp as number) * 1000 - new Date().getTime() - 5000;
    setTimeout(async () => {
      await this.refreshToken();
    }, timeoutForRequest);
  }
}
