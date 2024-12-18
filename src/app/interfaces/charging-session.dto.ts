export interface ChargingSessionDto {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: string;
  spotId: string;
  spot?: ChargingSpotDto;
}

export interface ChargingSpotDto {
  id: string;
  officeId: string;
  spotName: string;
  chargingSessions?: ChargingSessionDto[];
}
