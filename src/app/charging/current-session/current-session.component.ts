import { Component, Input, OnInit, signal } from '@angular/core';
import { ChargingSessionDto } from '../../interfaces/charging-session.dto';
import { ChargingService } from '../../services/charging.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-current-session',
  imports: [MatButtonModule],
  templateUrl: './current-session.component.html',
  styleUrl: './current-session.component.scss',
})
export class CurrentSessionComponent implements OnInit {
  @Input() session!: ChargingSessionDto;

  readonly sessionDuration = signal('');

  constructor(private chargingService: ChargingService) {}

  ngOnInit() {
    this.setIntervalForDuration();
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
    const seconds = timeInSeconds % 60;
    const allMinutes = Math.floor(timeInSeconds / 60);
    const minutes = allMinutes % 60;
    const hours = Math.floor(allMinutes / 60);
    return `${hours}:${minutes}:${seconds}`;
  }
}
