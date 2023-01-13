import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../../shared/services/api/api.service';
import { ResultHistoryOfChangesModalService } from './result-history-of-changes-modal.service';

@Component({
  selector: 'app-result-history-of-changes-modal',
  templateUrl: './result-history-of-changes-modal.component.html',
  styleUrls: ['./result-history-of-changes-modal.component.scss']
})
export class ResultHistoryOfChangesModalComponent {
  constructor(public api: ApiService, public resultHistoryOfChangesModalSE: ResultHistoryOfChangesModalService) {}
  cleanObject() {}
}
