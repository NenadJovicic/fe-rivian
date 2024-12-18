export interface ChargingSessionDto {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: string;
  spotId: string;
  spot?: ChargingSpot;
}

export interface ChargingSpot {
  id: string;
  officeId: string;
  spotName: string;
}
