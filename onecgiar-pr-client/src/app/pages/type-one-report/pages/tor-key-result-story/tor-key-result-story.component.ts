import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/services/api/api.service';
import { TypeOneReportService } from '../../type-one-report.service';

@Component({
  selector: 'app-tor-key-result-story',
  templateUrl: './tor-key-result-story.component.html',
  styleUrls: ['./tor-key-result-story.component.scss']
})
export class TorKeyResultStoryComponent {
  constructor(private api: ApiService, private typeOneReportSE: TypeOneReportService) {}
  tablesList = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.GET_keyResultStoryInitiativeId();
  }

  GET_keyResultStoryInitiativeId() {
    this.api.resultsSE.GET_keyResultStoryInitiativeId(this.typeOneReportSE.getInitiativeID(this.typeOneReportSE.initiativeSelected)?.id).subscribe(({ response }) => {
      this.typeOneReportSE.keyResultStoryData = response;
      console.log(response);
      this.tablesList = [];
      response.forEach(table => {
        this.formatTable(table);
      });
    });
  }

  onSaveSection() {
    console.log(this.typeOneReportSE.keyResultStoryData);
    this.api.resultsSE.PATCH_primaryImpactAreaKrs(this.typeOneReportSE.keyResultStoryData).subscribe(
      resp => {
        console.log(resp);
        this.GET_keyResultStoryInitiativeId();
        this.api.alertsFe.show({ id: 'save-button', title: 'Key result story informaion saved correctly', description: '', status: 'success', closeIn: 500 });
      },
      err => {
        console.log(err);
      }
    );
  }

  // onSave() {
  //   console.log(this.typeOneReportSE.keyResultStoryData);

  //   this.isSaving = true;
  //   setTimeout(() => {
  //     this.isSaving = false;
  //   }, 3000);
  // }

  formatTable(tableData) {
    const header = [{ attr: 'category' }, { attr: 'value' }];
    let data = [
      { category: 'Result title', value: '', id: null },
      { category: 'Primary submitter', value: '' },
      { category: 'Contributing initiatives', value: '' },
      { category: 'Contributing centers', value: '' },
      { category: 'Contributing external partner(s)', value: '' },
      { category: 'Geographic location', value: '' },
      { category: 'Primary Impact Area', value: '' },
      { category: 'Other relevant Impact Area(s)', value: '' },
      { category: 'Which collective global targets for the relevant Impact Area(s) from the CGIAR 2030 Research and Innovation Strategy does the key result contribute to?', value: '' },
      { category: 'Does this key result build on work or previous results from one or more CRPs?', value: '' }
    ];

    const table = tableData;
    //(table);
    if (!table) return (data = null);

    const is_impact = Boolean(Number(table.is_impact));

    const noDataText = '<div class="no-data-text-format">This result is not a impact reported in the PRMS Reporting tool</div>';

    data[0].value = table.result_title || '<div class="no-data-text-format">There are not result title data</div>';
    data[0].id = table.result_code;
    data[1].value = table.primary_submitter || '<div class="no-data-text-format">There are not primary submitter data</div>';
    data[2].value = table.contributing_initiative || '<div class="no-data-text-format">There are not contributing initiatives data</div>';
    data[3].value = table.contributing_center || '<div class="no-data-text-format">There are not contributing centers data</div>';
    data[4].value = table.contribution_external_partner || '<div class="no-data-text-format">There are not contributing external partner(s) data</div>';
    const countriesText = `<strong>Countries:</strong><br> ${table.countries} <br>`;
    const regionsText = `<br><strong>Regions:</strong><br>${table.regions}<br> `;
    data[5].value = (table.countries ? countriesText : '') + (table.regions ? regionsText : '') || '<div class="no-data-text-format">There are not Geographic location data</div>';
    data[6].value = JSON.parse(table?.impact_areas) || noDataText;
    data[7].value = table.other_impact_areas || noDataText;
    data[8].value = table.global_targets || noDataText;
    data[9].value = table.web_legacy || '<div class="no-data-text-format">There are not web legacy data</div>';

    if (!is_impact) {
      // data.splice(8, 1);
      // data.splice(7, 1);
      // data.splice(6, 1);
    }

    this.tablesList.push({ data, header });
  }

  validateOneDropDown() {
    return this.typeOneReportSE.keyResultStoryData.some(item => JSON.parse(item?.impact_areas)?.length);
  }
}
