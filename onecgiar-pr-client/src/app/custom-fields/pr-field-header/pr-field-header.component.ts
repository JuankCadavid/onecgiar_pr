import { Component, Input, OnInit } from '@angular/core';
import { RolesService } from '../../shared/services/global/roles.service';

@Component({
  selector: 'app-pr-field-header',
  templateUrl: './pr-field-header.component.html',
  styleUrls: ['./pr-field-header.component.scss']
})
export class PrFieldHeaderComponent {
  @Input() simpleStyle: boolean;
  @Input() label: string;
  @Input() description: string;
  @Input() required: boolean = true;
  @Input() readOnly: boolean;
  @Input() useColon: boolean = true;
  @Input() showDescriptionLabel: boolean = true;
  constructor(public rolesSE: RolesService) {}
  get descriptionLabel() {
    // console.log(this.rolesSE.readOnly);
    return this.showDescriptionLabel && !this.rolesSE.readOnly ? `<strong class="description_header">Description:</strong>` : '';
  }
}
