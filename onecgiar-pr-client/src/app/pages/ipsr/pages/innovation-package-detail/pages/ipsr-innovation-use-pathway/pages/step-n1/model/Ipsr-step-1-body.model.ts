export class IpsrStep1Body {
  initiative_id: number = null;
  geo_scope_id: number = null;
  countries: Country[] = [];
  regions: any[] = [];
  coreResult: any = null;
  eoiOutcomes: EoiOutcome[] = [];
  actionAreaOutcomes: ActionAreaOutcome[] = [];
  impactAreas: ImpactArea[] = [];
  sdgTargets: SdgTarget[] = [];
  innovatonUse: InnovatonUse = new InnovatonUse();
  institutions: Institutions[] = [];
  experts: Expert[] = [];
  result_ip = new Result_ip();
}

export class Expert {
  first_name: string;
  last_name: string;
  email: string;
  organization_id: number;
  expertises_id: number;
  is_active: boolean;
}

class Result_ip {
  //experts
  is_not_diverse_justification: string = null;
  experts_is_diverse: boolean = null;
  // Consensus and Consultation
  consensus_initiative_work_package_id: number = null;
  relevant_country_id: number = null;
  regional_leadership_id: number = null;
  regional_integrated_id: number = null;
  active_backstopping_id: number = null;
}

interface Institutions {
  institutions_id: number;
  institutions_name: string;
  institutions_type_name: string;
  deliveries: Delivery[];
}

interface Delivery {
  partner_delivery_type_id: number;
}

class InnovatonUse {
  actors: Actor[] = [];
  organization: Organization[] = [];
  measures: Measure[] = [];
}

export class Measure {
  unit_of_measure: string;
  quantity: number;
  is_active: boolean;
}

export class Organization {
  institution_types_id: number;
  institution_sub_type_id: number;
  how_many: number;
  // Aux
  hide: boolean;
  is_active: boolean;
}

export class Actor {
  actor_type_id: number;
  women: number;
  women_youth: number;
  men: number;
  men_youth: number;
  is_active: boolean;
  women_non_youth: any;
  men_non_youth: any;
}

interface SdgTarget {
  clarisa_sdg_usnd_code: number;
  clarisa_sdg_target_id: number;
  sdg_target: string;
}

interface ImpactArea {
  impact_area_indicator_id: number;
  target: string;
}

interface ActionAreaOutcome {
  action_area_outcome_id: number;
  outcomeStatement: string;
  is_active: boolean;
}

interface EoiOutcome {
  toc_result_id: number;
}

interface Country {
  id: number;
  name: string;
}

export class CoreResult {
  result_code: string = null;
  title: string = null;
  official_code: string = null;
}
