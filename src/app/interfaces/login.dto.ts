import { UserDto } from './user.dto';

export interface LoginReqDto {
  email: string;
  password: string;
}

export interface LoginResDto {
  token: string;
  user: UserDto;
}
