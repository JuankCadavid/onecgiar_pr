import { Component, Input, OnInit } from '@angular/core';
import { IpsrStep1Body } from 'src/app/pages/ipsr/pages/innovation-package-detail/pages/ipsr-innovation-use-pathway/pages/step-n1/model/Ipsr-step-1-body.model';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-sdg-targets',
  templateUrl: './sdg-targets.component.html',
  styleUrls: ['./sdg-targets.component.scss']
})
export class SdgTargetsComponent implements OnInit {

  currentsdgID = null;
  @Input() body = [];
  sdgTargetLis = [];
  constructor(public api: ApiService) {}
  ngOnInit(): void {
    this.GETAllClarisaSdgsTargets();
  }
  GETAllClarisaSdgsTargets() {
    this.api.resultsSE.GETAllClarisaSdgsTargets().subscribe(
      ({ response }) => {
        this.sdgTargetLis = response;
        this.sdgTargetLis.forEach(sdg => {
          //(sdg);
          sdg.sdgId = sdg.sdg.usnd_code;
          sdg.short_name = sdg.sdg.short_name;
          sdg.sdgList.map(item => (item.full_name = `<strong>${item.sdg_target_code}</strong> - ${item.sdg_target}`));
        });
        //(this.sdgTargetLis);

        // this.mapSdgTargetListDropdowns(response);
      },
      err => {
        console.error(err);
      }
    );
  }
  removeOption(option) {
    const index = this.body.findIndex((valueItem: any) => valueItem.id == option.id);
    this.body.splice(index, 1);
  }
  // mapSdgTargetListDropdowns(objectList) {
  //   (objectList);
  //   (Object.keys(objectList));
  //   Object.keys(objectList).forEach(key => {
  //     this.sdgTargetListDropdowns.push({ list: objectList[key], key });
  //   });
  //   (this.sdgTargetListDropdowns);
  // }
  onSelectSDG(sdgItem) {
    this.sdgTargetLis.map(sdg => (sdg.selected = false));
    sdgItem.selected = true;
    this.currentsdgID = sdgItem.sdgId;
  }

}