import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../../../../../../shared/services/api/api.service';

@Component({
  selector: 'app-toc-initiative-aao',
  templateUrl: './toc-initiative-aao.component.html',
  styleUrls: ['./toc-initiative-aao.component.scss']
})
export class TocInitiativeAaoComponent {
  @Input() readOnly: boolean;
  @Input() initiative: any;
  @Input() editable: boolean;
  value = true;
  actionAreasOutcomesList = [];
  constructor(public api: ApiService) {}

  ngOnInit(): void {
    this.GET_tocLevelsByresultId();
  }

  GET_tocLevelsByresultId() {
    this.api.tocApiSE.GET_tocLevelsByconfig(this.initiative.results_id, this.initiative.initiative_id, 4).subscribe({
      next: ({ response }) => {
        this.actionAreasOutcomesList = response;
      },
      error: err => {
        console.error(err);
      }
    });
    /*this.api.tocApiSE.GET_tocLevelsByresultId(this.initiative.initiative_id, 4).subscribe(
      ({ response }) => {
        this.actionAreasOutcomesList = response;
        //(response);
      },
      err => {
        console.error(err);
      }
    );*/
  }
}
