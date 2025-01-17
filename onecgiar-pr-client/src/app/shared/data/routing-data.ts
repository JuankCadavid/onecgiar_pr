import { Route } from '@angular/router';
import { ResultsModule } from '../../pages/results/results.module';
import { HomeModule } from '../../pages/home/home.module';

export const routingApp: PrRoute[] = [
  { prName: 'Home', path: 'home', loadChildren: () => import('../../pages/home/home.module').then(m => m.HomeModule) },
  { prName: 'Results', path: 'result', loadChildren: () => import('../../pages/results/results.module').then(m => m.ResultsModule) },
  { prName: 'Type one report', path: 'type-one-report', loadChildren: () => import('../../pages/type-one-report/type-one-report.module').then(m => m.TypeOneReportModule) },
  { prName: 'login', prHide: true, path: 'login', loadChildren: () => import('../../pages/login/login.module').then(m => m.LoginModule) },
  { prName: '', path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const resultRouting: PrRoute[] = [
  { prName: 'Result Creator', path: 'result-creator', loadChildren: () => import('../../pages/results/pages/result-creator/result-creator.module').then(m => m.ResultCreatorModule) },
  { prName: 'Result detail', path: 'result-detail/:id', loadChildren: () => import('../../pages/results/pages/result-detail/result-detail.module').then(m => m.ResultDetailModule) },
  { prName: '', path: 'results-list', loadChildren: () => import('../../pages/results/pages/results-list/results-list.module').then(m => m.ResultsListModule) },
  { prName: '', path: '**', pathMatch: 'full', redirectTo: 'results-list' }
];

export const resultDetailRouting: PrRoute[] = [
  { prName: 'General information', path: 'general-information', loadChildren: () => import('../../pages/results/pages/result-detail/pages/rd-general-information/rd-general-information.module').then(m => m.RdGeneralInformationModule) },
  { prName: 'Theory of change', path: 'theory-of-change', loadChildren: () => import('../../pages/results/pages/result-detail/pages/rd-theory-of-change/rd-theory-of-change.module').then(m => m.RdTheoryOfChangeModule) },
  { prName: 'Policy info', path: 'policy-info', loadChildren: () => import('../../pages/results/pages/result-detail/pages/rd-policy-info/rd-policy-info.module').then(m => m.RdPolicyInfoModule) },
  { prName: 'Contributors', path: 'contributors', loadChildren: () => import('../../pages/results/pages/result-detail/pages/rd-contributors/rd-contributors.module').then(m => m.RdContributorsModule) },
  { prName: 'Partners', path: 'partners', loadChildren: () => import('../../pages/results/pages/result-detail/pages/rd-partners/rd-partners.module').then(m => m.RdPartnersModule) },
  { prName: 'Geographic location', path: 'geographic-location', loadChildren: () => import('../../pages/results/pages/result-detail/pages/rd-geographic-location/rd-geographic-location.module').then(m => m.RdGeographicLocationModule) },
  { prName: 'Evidences', path: 'evidences', loadChildren: () => import('../../pages/results/pages/result-detail/pages/rd-evidences/rd-evidences.module').then(m => m.RdEvidencesModule) },
  { prName: 'Links to results', path: 'links-to-results', loadChildren: () => import('../../pages/results/pages/result-detail/pages/rd-links-to-results/rd-links-to-results.module').then(m => m.RdLinksToResultsModule) },
  { prName: '', path: '**', pathMatch: 'full', redirectTo: 'general-information' }
];

export interface PrRoute extends Route {
  prName: string;
  prHide?: boolean;
}
