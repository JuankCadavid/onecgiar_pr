import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../../shared/services/api/api.service';
import { ShareRequestBody } from './model/shareRequestBody.model';
import { RolesService } from '../../../../../../shared/services/global/roles.service';
import { ShareRequestModalService } from './share-request-modal.service';
import { Router } from '@angular/router';
import { RetrieveModalService } from '../retrieve-modal/retrieve-modal.service';
import { environment } from 'src/environments/environment';
import { ResultsNotificationsService } from '../../../results-outlet/pages/results-notifications/results-notifications.service';

@Component({
  selector: 'app-share-request-modal',
  templateUrl: './share-request-modal.component.html',
  styleUrls: ['./share-request-modal.component.scss']
})
export class ShareRequestModalComponent {
  platformIsClosed = environment.platformIsClosed;
  requesting = false;
  allInitiatives = [];
  showForm = true;
  showTocOut = true;
  disabledOptions = [
    {
      initiative_id: 10
    }
  ];
  constructor(public retrieveModalSE: RetrieveModalService, public api: ApiService, public rolesSE: RolesService, public shareRequestModalSE: ShareRequestModalService, private router: Router, public resultsNotificationsSE: ResultsNotificationsService) { }
  ngOnInit(): void {


    this.shareRequestModalSE.shareRequestBody = new ShareRequestBody();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.api.resultsSE.ipsrDataControlSE.inIpsr);

    this.GET_AllInitiatives();

  }

  cleanObject() {
    // console.log('cleanForm');
    this.showForm = false;
    this.shareRequestModalSE.shareRequestBody = new ShareRequestBody();

    setTimeout(() => {
      console.log(this.allInitiatives);

      this.showForm = true;
    }, 0);
  }

  onRequest() {
    this.requesting = true;
    this.shareRequestModalSE.shareRequestBody.initiativeShareId.push(this.shareRequestModalSE.shareRequestBody.initiative_id);
    console.log(this.shareRequestModalSE.shareRequestBody);
    this.api.resultsSE.POST_createRequest(this.shareRequestModalSE.shareRequestBody).subscribe(
      resp => {
        console.log(this.api.dataControlSE.currentResult);
        this.api.dataControlSE.showShareRequest = false;

        this.api.alertsFe.show({ id: 'requesqshared', title: `Request sent`, description: `Once your request is accepted, the result can be mapped to your Initiative's ToC.`, status: 'success' });
        this.requesting = false;
        if (this.api.resultsSE.ipsrDataControlSE.inIpsr) {
          this.router.navigate([`/ipsr/list/innovation-list`]);
        } else {
          this.router.navigate([`/result/results-outlet/results-list`]);
        }
      },
      err => {
        console.log(err);
        this.api.dataControlSE.showShareRequest = false;

        this.api.alertsFe.show({ id: 'requesqsharederror', title: 'Error when requesting', description: '', status: 'error' });
        this.requesting = false;
      }
    );
  }

  modelChange() {
    // console.log('modelChange');
    this.showTocOut = false;
    setTimeout(() => {
      let iniciativeSelected = this.allInitiatives.filter((resp) => resp.initiative_id == this.shareRequestModalSE.shareRequestBody.initiative_id);
      this.shareRequestModalSE.shareRequestBody['official_code'] = iniciativeSelected[0].official_code;
      this.shareRequestModalSE.shareRequestBody['short_name'] = iniciativeSelected[0].short_name;
      this.showTocOut = true;
      console.log(this.shareRequestModalSE.shareRequestBody.initiative_id);
    }, 500);
  }

  acceptOrReject() {
    let body = { ...this.api.dataControlSE.currentNotification, ...this.shareRequestModalSE.shareRequestBody, request_status_id: 2 };
    // console.log(this.api.resultsSE.ipsrDataControlSE.inIpsr);
    this.requesting = true;
    this.api.resultsSE.PATCH_updateRequest(body).subscribe(
      resp => {
        // console.log(resp);
        this.api.dataControlSE.showShareRequest = false;
        this.api.alertsFe.show({ id: 'noti', title: `Request sent`, description: `Once your request is accepted, the result can be mapped to your Initiative's ToC.`, status: 'success' });
        this.requesting = false;
        if (this.api.resultsSE.ipsrDataControlSE.inIpsr) {

          this.resultsNotificationsSE.get_section_innovation_packages();
        } else {
          this.resultsNotificationsSE.get_section_information();
        }

      },
      err => {
        this.api.dataControlSE.showShareRequest = false;
        this.api.alertsFe.show({ id: 'noti-error', title: 'Error when requesting ', description: '', status: 'error' });
        this.requesting = false;
      }
    );
  }

  GET_AllInitiatives() {
    this.api.resultsSE.GET_AllInitiatives().subscribe(({ response }) => {
      this.allInitiatives = response;
    });
  }
}
