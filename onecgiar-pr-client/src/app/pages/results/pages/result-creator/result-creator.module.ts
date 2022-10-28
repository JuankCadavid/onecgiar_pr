import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultCreatorRoutingModule } from './result-creator-routing.module';
import { ResultCreatorComponent } from './result-creator.component';
import { CustomFieldsModule } from '../../../../custom-fields/custom-fields.module';
import { FormsModule } from '@angular/forms';
import { ResultLevelButtonsComponent } from './components/result-level-buttons/result-level-buttons.component';
import { SimilarResultsComponent } from './components/similar-results/similar-results.component';
import { SimilarResultsPipe } from './components/similar-results/pipes/similar-results.pipe';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [ResultCreatorComponent, ResultLevelButtonsComponent, SimilarResultsComponent, SimilarResultsPipe],
  imports: [CommonModule, ResultCreatorRoutingModule, CustomFieldsModule, FormsModule, MenuModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResultCreatorModule {}
