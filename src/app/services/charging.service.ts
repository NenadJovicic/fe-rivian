import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChargingSessionDto, ChargingSpotDto } from '../interfaces/charging-session.dto';
import { OfficeDto } from '../interfaces/office.dto';
import { AuthService } from './auth.service';
import { WebService } from './web.service';

@Injectable()
export class ChargingService {
  private officesSubject = new BehaviorSubject<OfficeDto[]>([]);
  public readonly $offices = this.officesSubject.asObservable();

  private currentSessionSubject = new BehaviorSubject<ChargingSessionDto | undefined>(undefined);
  public readonly $currentSession = this.currentSessionSubject.asObservable();

  private chargingSpotsForOfficeSubject = new BehaviorSubject<ChargingSpotDto[]>([]);
  public readonly $chargingSpotsForOffice = this.chargingSpotsForOfficeSubject.asObservable();

  constructor(private readonly webService: WebService, private readonly authService: AuthService) {
    this.loadOffices();
    this.fetchCurrentSession();
  }

  public async loadSpotsForOffice(id: string) {
    const spots = await this.webService.get<ChargingSpotDto[]>(`charging-spot/office/${id}`);
    this.chargingSpotsForOfficeSubject.next(spots);
  }

  public async startCharging(selectedOfficeId: string): Promise<ChargingSessionDto | undefined> {
    const chargingSession = await this.webService.post<ChargingSessionDto | undefined>('charging-session', {
      userId: this.authService.user.id,
      officeId: selectedOfficeId,
    });
    if (chargingSession) {
      this.currentSessionSubject.next(chargingSession);
    }
    return chargingSession;
  }

  public async stopCharging(id: string) {
    await this.webService.patch(`charging-session/${id}`, {});
    this.currentSessionSubject.next(undefined);
  }

  private async loadOffices() {
    const offices = await this.webService.get<OfficeDto[]>('office');
    this.officesSubject.next(offices);
  }

  private async fetchCurrentSession() {
    const currentSession = await this.webService.get<ChargingSessionDto | undefined>('charging-session/current-session');
    this.currentSessionSubject.next(currentSession);
  }
}
