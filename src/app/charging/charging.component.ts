import { Component } from '@angular/core';
import { ChargingSessionDto } from '../interfaces/charging-session.dto';
import { ChargingService } from '../services/charging.service';
import { CurrentSessionComponent } from './current-session/current-session.component';

@Component({
  selector: 'app-charging',
  imports: [CurrentSessionComponent],
  templateUrl: './charging.component.html',
  styleUrl: './charging.component.scss',
  providers: [ChargingService],
})
export class ChargingComponent {
  currentSession: ChargingSessionDto | undefined;
  constructor(private chargingService: ChargingService) {
    this.chargingService.$currentSession.subscribe((session) => (this.currentSession = session));
  }
}
