import { Component, OnInit } from '@angular/core';
import { IpsrDataControlService } from 'src/app/pages/ipsr/services/ipsr-data-control.service';
import { IpsrStep4Body } from './model/Ipsr-step-4-body.model';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-step-n4',
  templateUrl: './step-n4.component.html',
  styleUrls: ['./step-n4.component.scss']
})
export class StepN4Component implements OnInit {
  ipsrStep4Body = new IpsrStep4Body();
  constructor(public ipsrDataControlSE: IpsrDataControlService, private api: ApiService) {}
  radioOptions = [
    { id: true, name: 'Yes' },
    { id: false, name: 'No, not necessary at this stage' }
  ];
  ngOnInit(): void {
    this.getSectionInformation();
    this.api.dataControlSE.findClassTenSeconds('alert-event-3').then(resp => {
      try {
        document.querySelector('.alert-event-3').addEventListener('click', e => {
          this.api.dataControlSE.showPartnersRequest = true;
        });
      } catch (error) {}
    });
  }

  getSectionInformation() {
    this.api.resultsSE.GETInnovationPathwayStepFourByRiId().subscribe(({ response }) => {
      console.log('%cGET', 'font-size: 20px; color: #2BBE28;');
      console.log(response);
      console.log('%c____________________', 'font-size: 20px; color: #2BBE28;');
      this.ipsrStep4Body = response;
    });
  }
  onSaveSection() {
    console.log('%cPATCH', 'font-size: 20px; color: #f68541;');
    console.log(this.ipsrStep4Body);
    console.log('%c____________________', 'font-size: 20px; color: #f68541;');
    this.api.resultsSE.PATCHInnovationPathwayStepFourByRiId(this.ipsrStep4Body).subscribe(({ response }) => {
      console.log(response);
      // setTimeout(() => {
      this.getSectionInformation();
      // }, 3000);
    });
  }

  workshopDescription() {
    return `A template participant list can be downloaded <a href=""  class="open_route" target="_blank">here</a>`;
  }
}
