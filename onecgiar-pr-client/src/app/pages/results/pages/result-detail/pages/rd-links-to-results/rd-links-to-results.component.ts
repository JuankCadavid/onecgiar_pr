import { Component } from '@angular/core';
import { ApiService } from '../../../../../../shared/services/api/api.service';
import { ResultsListService } from '../../../results-outlet/pages/results-list/services/results-list.service';
import { LinksToResultsBody } from './models/linksToResultsBody';

@Component({
  selector: 'app-rd-links-to-results',
  templateUrl: './rd-links-to-results.component.html',
  styleUrls: ['./rd-links-to-results.component.scss']
})
export class RdLinksToResultsComponent {
  constructor(public api: ApiService, public resultsListService: ResultsListService) {}
  linksToResultsBody = new LinksToResultsBody();
  text_to_search: string = '';
  counterPipe = 0;
  columnOrder = [
    { title: 'ID', attr: 'id' },
    { title: 'Title', attr: 'title', class: 'notCenter' },
    // { title: 'Reporting year', attr: 'reported_year' },
    { title: 'Result type', attr: 'result_type' },
    { title: 'Submitter', attr: 'submitter' },
    { title: 'Status', attr: 'status_name' },
    { title: 'Creation date	', attr: 'created_date' }
  ];

  ngOnInit(): void {
    this.api.updateResultsList();
    this.getSectionInformation();
  }
  onLinkResult(result) {
    console.log(result);
    this.linksToResultsBody.links.push(result);
    this.counterPipe++;
  }
  onRemove(index) {
    this.linksToResultsBody.links.splice(index, 1);
    this.counterPipe++;
  }

  getSectionInformation() {
    this.api.resultsSE.GET_resultsLinked().subscribe(({ response }) => {
      console.log(response);
      this.linksToResultsBody = response;
    });
  }
  addLegacy_link() {
    this.linksToResultsBody.legacy_link.push({});
  }

  deleteLegacy_link(index) {
    this.linksToResultsBody.legacy_link.splice(index, 1);
  }
  onSaveSection() {
    console.log(this.linksToResultsBody);
    this.api.resultsSE.POST_resultsLinked(this.linksToResultsBody).subscribe(resp => {
      console.log(resp);
      this.getSectionInformation();
    });
  }
  openInNewPage(link) {
    window.open(link, '_blank');
  }

  get validateCGSpaceLinks() {
    for (const iterator of this.linksToResultsBody.legacy_link) {
      if (this.linksToResultsBody.legacy_link.find(evidence => !Boolean(evidence.legacy_link))) return true;
      const evidencesFinded = this.linksToResultsBody.legacy_link.filter(evidence => evidence.legacy_link == iterator.legacy_link);
      if (evidencesFinded.length >= 2) {
        return evidencesFinded.length >= 2;
      }
    }
    return false;
  }
}
