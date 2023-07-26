import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TocInitiativeOutComponent } from './toc-initiative-out.component';
import { CustomFieldsModule } from '../../../../../../../../../custom-fields/custom-fields.module';
import { OutcomeLevelFilterPipe } from '../../../outcome-level-filter.pipe';
import { TargetIndicatorComponent } from './target-indicator/target-indicator.component';

@NgModule({
  declarations: [TocInitiativeOutComponent, OutcomeLevelFilterPipe, TargetIndicatorComponent],
  exports: [TocInitiativeOutComponent],
  imports: [CommonModule, CustomFieldsModule]
})
export class TocInitiativeOutModule {}
