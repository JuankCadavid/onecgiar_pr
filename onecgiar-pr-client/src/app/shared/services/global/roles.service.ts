import { Injectable } from '@angular/core';
import { AuthService } from '../api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  readOnly = true;
  currentInitiativeRole = null;
  roles: any;
  restrictions = [
    {
      id: 1,
      description: 'Change lead and co-lead',
      roleIds: [5, 6]
    },
    {
      id: 2,
      description: 'Not able to accept/reject results from other initiatives',
      roleIds: [6]
    },
    {
      id: 3,
      description: 'Not able to submit/un-submit results',
      roleIds: [6]
    }
  ];

  constructor(private authSE: AuthService) {}

  fieldValidation(restrictionId) {
    const restrictionFinded = this.restrictions.find(restriction => restriction.id == restrictionId);
    console.log(restrictionFinded);
    return Boolean(restrictionFinded.roleIds.find(roleId => roleId == this.currentInitiativeRole));
  }
  validateApplication(application) {
    this.readOnly = application?.role_id != 1;
    return { isAdmin: !this.readOnly };
  }

  async validateReadOnly(result?) {
    // console.log('%cvalidateReadOnly', 'background: #222; color: #52cd47');
    if (!this.roles) await this.updateRolesList();
    if (!this.roles) return (this.readOnly = true);
    const { application, initiative } = this.roles;
    const { isAdmin } = this.validateApplication(application);
    if (isAdmin) return null;
    const { initiative_id } = result;
    const initiativeFinded = initiative.find(init => init.initiative_id == initiative_id);
    this.readOnly = Boolean(!initiativeFinded);
    // this.readOnly ? console.log('%cIs ReadOnly => ' + this.readOnly, 'background: #222; color: #d84242') : console.log('%cNot ReadOnly => ' + this.readOnly, 'background: #222; color: #aaeaf5');
    // console.log('%c******END OF validateReadOnly*******', 'background: #222; color: #52cd47');
    return null;
  }

  async updateRolesList() {
    return new Promise((resolve, reject) => {
      this.authSE.GET_allRolesByUser().subscribe(
        ({ response }) => {
          //? Update role list
          this.roles = response;
          //?
          resolve(response);
        },
        err => {
          reject();
        }
      );
    });
  }

  //TODO App roles
  /*
  Admin  
  Guest 
  */

  //TODO Roles by initiative
  /*
  Lead
  Co-Lead
  Coordinator
  Member
  */
}
