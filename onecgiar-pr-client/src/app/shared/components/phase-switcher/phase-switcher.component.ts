import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-phase-switcher',
  templateUrl: './phase-switcher.component.html',
  styleUrls: ['./phase-switcher.component.scss']
})
export class PhaseSwitcherComponent implements OnInit {
  route = '';
  resultPhaseList = [];
  constructor(private api: ApiService, private router: Router, public activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.route = this.router.url.split('?')[0];
    console.log(this.router.url.split('?')[0]);
    console.log(this.activatedRoute.snapshot.queryParams);
    this.api.resultsSE.GET_versioningResult().subscribe(({ response }) => {
      console.log(response);
      this.resultPhaseList = response;
    });
  }

  getRouteWithQueryParams(phaseId) {
    return `${this.route}?phase=${phaseId}`;
  }

  goToresultUrl(phaseId) {
    this.router.navigate([this.route], { queryParams: { phase: phaseId } }).then(() => {
      window.location.reload();
    });
  }
}
