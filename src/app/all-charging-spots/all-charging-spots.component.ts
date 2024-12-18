import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ChargingSpotDto } from '../interfaces/charging-session.dto';
import { OfficeDto } from '../interfaces/office.dto';
import { AuthService } from '../services/auth.service';
import { ChargingService } from '../services/charging.service';

@Component({
  selector: 'app-all-charging-spots',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './all-charging-spots.component.html',
  styleUrl: './all-charging-spots.component.scss',
})
export class AllChargingSpotsComponent {
  offices: OfficeDto[] = [];
  chargingSpots: ChargingSpotDto[] = [];

  private _selectedOfficeId: string = '';
  get selectedOfficeId(): string {
    return this._selectedOfficeId;
  }

  set selectedOfficeId(id: string) {
    this._selectedOfficeId = id;
    this.chargingService.loadSpotsForOffice(id);
  }

  constructor(private chargingService: ChargingService, private authService: AuthService) {
    this.chargingService.$offices.subscribe((offices) => (this.offices = offices));
    this.selectedOfficeId = this.authService.user.defaultOfficeId;
    this.chargingService.$chargingSpotsForOffice.subscribe((spots) => (this.chargingSpots = spots));
  }
}
