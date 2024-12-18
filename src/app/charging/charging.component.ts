import { Component } from '@angular/core';
import { AllChargingSpotsComponent } from '../all-charging-spots/all-charging-spots.component';
import { ChargingSessionDto } from '../interfaces/charging-session.dto';
import { UserDto } from '../interfaces/user.dto';
import { AuthService } from '../services/auth.service';
import { ChargingService } from '../services/charging.service';
import { CurrentSessionComponent } from './current-session/current-session.component';
import { NewChargingComponent } from './new-charging/new-charging.component';

@Component({
  selector: 'app-charging',
  imports: [CurrentSessionComponent, NewChargingComponent, AllChargingSpotsComponent],
  templateUrl: './charging.component.html',
  styleUrl: './charging.component.scss',
  providers: [ChargingService],
})
export class ChargingComponent {
  currentSession: ChargingSessionDto | undefined;
  user: UserDto;

  constructor(private chargingService: ChargingService, private authService: AuthService) {
    this.chargingService.$currentSession.subscribe((session) => (this.currentSession = session));
    this.user = this.authService.user;
  }
}
