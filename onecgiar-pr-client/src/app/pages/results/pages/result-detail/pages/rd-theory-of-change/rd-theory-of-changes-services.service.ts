import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RdTheoryOfChangesServicesService {
  targetsIndicators: any = [];
  impactAreasTargets: any = [];
  sdgTargest: any = [];
  isSdg: boolean;
  isImpactArea: boolean;
  constructor() { }
}