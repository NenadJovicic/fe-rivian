import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OfficeDto } from '../../interfaces/office.dto';
import { AuthService } from '../../services/auth.service';
import { ChargingService } from '../../services/charging.service';

@Component({
  selector: 'app-new-charging',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule],
  templateUrl: './new-charging.component.html',
  styleUrl: './new-charging.component.scss',
})
export class NewChargingComponent {
  offices: OfficeDto[] = [];
  selectedOfficeId: string;
  message: string = '';

  constructor(private chargingService: ChargingService, private authService: AuthService) {
    this.chargingService.$offices.subscribe((offices) => (this.offices = offices));
    this.selectedOfficeId = this.authService.user.defaultOfficeId;
  }

  async startCharging() {
    try {
      const newSession = await this.chargingService.startCharging(this.selectedOfficeId);
      if (!newSession) {
        this.message = 'You are added to queue';
      }
    } catch (error) {
      this.message = (error as HttpErrorResponse).error.message;
    }
  }
}
