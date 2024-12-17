import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebService {
  constructor(private readonly http: HttpClient) {}

  public async get<T>(path: string): Promise<T> {
    return lastValueFrom(this.http.get<T>(this.getUrl(path)));
  }

  public async post<T>(path: string, body: any): Promise<T> {
    return lastValueFrom(this.http.post<T>(this.getUrl(path), body));
  }

  public async patch<T>(path: string, body: any): Promise<T> {
    return lastValueFrom(this.http.patch<T>(this.getUrl(path), body));
  }

  private getUrl(path: string): string {
    // this localhost:4444 can be read in production from some env
    return `http://localhost:4444/api/${path}`;
  }
}
