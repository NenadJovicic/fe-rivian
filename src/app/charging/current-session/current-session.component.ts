import { Component, Input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ChargingSessionDto } from '../../interfaces/charging-session.dto';
import { ChargingService } from '../../services/charging.service';

@Component({
  selector: 'app-current-session',
  imports: [MatButtonModule],
  templateUrl: './current-session.component.html',
  styleUrl: './current-session.component.scss',
})
export class CurrentSessionComponent implements OnInit {
  @Input() session!: ChargingSessionDto;

  readonly sessionDuration = signal('');
  currentOfficeName: string | undefined;

  constructor(private chargingService: ChargingService) {}

  ngOnInit() {
    this.setIntervalForDuration();
    this.chargingService.$offices.subscribe((offices) => {
      const sessionOffice = offices.find((office) => office.id === this.session.spot?.officeId);
      this.currentOfficeName = sessionOffice?.name;
    });
  }

  stopCharging() {
    this.chargingService.stopCharging(this.session.id);
  }

  private setIntervalForDuration() {
    this.sessionDuration.set(this.convertMillisecondsToTimestamp(Date.now() - new Date(this.session.startTime).getTime()));
    setInterval(() => {
      this.sessionDuration.set(this.convertMillisecondsToTimestamp(Date.now() - new Date(this.session.startTime).getTime()));
    }, 1000);
  }

  private convertMillisecondsToTimestamp(milliseconds: number): string {
    const timeInSeconds = Math.round(milliseconds / 1000);
    const seconds = String(timeInSeconds % 60).padStart(2, '0');
    const allMinutes = Math.floor(timeInSeconds / 60);
    const minutes = String(allMinutes % 60).padStart(2, '0');
    const hours = String(Math.floor(allMinutes / 60)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
}
