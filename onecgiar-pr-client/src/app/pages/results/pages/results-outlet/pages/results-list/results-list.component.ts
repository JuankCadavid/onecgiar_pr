import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ApiService } from '../../../../../../shared/services/api/api.service';
import { internationalizationData } from '../../../../../../shared/data/internationalizationData';
import { ResultsListService } from './services/results-list.service';
import { ResultItem } from '../../../../../../shared/interfaces/result';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnInit {
  columnOrder = [
    { title: 'ID', attr: 'id' },
    { title: 'Title', attr: 'title', class: 'notCenter' },
    { title: 'Reported year', attr: 'reported_year_id' },
    { title: 'Result type', attr: 'result_type' },
    { title: 'Submitter', attr: 'submitter' },
    { title: 'Status', attr: 'status_name' },
    { title: 'Creation date	', attr: 'created_date' }
  ];
  resultsList: ResultItem[];
  items: MenuItem[] = [
    {
      label: 'Map to TOC',
      icon: 'pi pi-fw pi-sitemap',
      command: () => {
        console.log('hola mundo');
      }
    },
    { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
    { label: 'Submit', icon: 'pi pi-fw pi-reply' }
  ];

  constructor(public api: ApiService, public resultsListService: ResultsListService) {}

  ngOnInit(): void {
    console.log('Result list');
    this.items;
    this.api.alertsFs.show({
      id: 'indoasd',
      status: 'success',
      title: '',
      description: internationalizationData?.resultsList?.alerts?.info,
      querySelector: '.alert'
    });

    this.api.resultsSE.getAllResults().subscribe(resp => {
      console.log(resp.response);
      this.resultsList = resp.response;
    });
  }
}