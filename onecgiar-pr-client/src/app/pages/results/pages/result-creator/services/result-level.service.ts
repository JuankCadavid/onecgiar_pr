import { Injectable } from '@angular/core';
import { ResultLevel, Resulttype, ResultBody } from '../../../../../shared/interfaces/result';
import { ApiService } from '../../../../../shared/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ResultLevelService {
  resultLevelList: ResultLevel[];
  resultTypeList: Resulttype[];
  resultBody = new ResultBody();
  constructor(private api: ApiService) {
    this.getAllResultLevel();
  }

  onSelectResultLevel(resultLevel: ResultLevel) {
    this.resultTypeList = resultLevel.result_type;
  }

  getAllResultLevel() {
    this.api.resultsSE.getAllResultLevel().subscribe(resp => {
      this.resultLevelList = resp.response;
    });
  }
}