export class IpsrStep3Body {
  innovatonUse = new InnovatonUse();
  result_innovation_package = new Resultinnovationpackage();
  result_ip_result_complementary: Resultipresultcomplementary[] = [];
  result_ip_result_core = new Resultipresultcomplementary();
}

class Resultipresultcomplementary {
  // is_active: boolean;
  // version_id: string;
  // created_date: string;
  // last_updated_date: string;
  created_by: string;
  // last_updated_by: string;
  // result_by_innovation_package_id: string;
  // result_innovation_package_id: string;
  // result_id: string;
  // ipsr_role_id: string;
  readinees_evidence_link?: any;
  use_evidence_link?: any;
  readiness_level_evidence_based?: any;
  use_level_evidence_based?: any;
  obj_result: any;
  readiness_details_of_evidence: string;
  use_details_of_evidence: string;
}

class Resultinnovationpackage {
  // is_active: boolean;
  // version_id: string;
  // created_date: string;
  // last_updated_date: string;
  // created_by: string;
  // last_updated_by: string;
  // result_innovation_package_id: string;
  // experts_is_diverse: boolean;
  // is_not_diverse_justification?: any;
  // consensus_initiative_work_package_id: string;
  // relevant_country_id: string;
  // regional_leadership_id: string;
  // regional_integrated_id: string;
  // active_backstopping_id: string;
  use_level_evidence_based = null;
  readiness_level_evidence_based = null;
  is_expert_workshop_organized = null;
}

class InnovatonUse {
  actors: ActorN3[] = [];
  organization: OrganizationN3[] = [];
  measures: MeasureN3[] = [];
}

export class MeasureN3 {
  unit_of_measure: string;
  quantity: number;
  is_active: boolean;
  evidence_link: string;
}

export class OrganizationN3 {
  institution_types_id: number;
  institution_sub_type_id: number;
  how_many: number;
  // Aux
  hide: boolean;
  is_active: boolean;
  evidence_link: string;
}

export class ActorN3 {
  actor_type_id: number;
  women: number;
  women_youth: number;
  previousWomen: number;
  previousWomen_youth: number;
  men: number;
  men_youth: number;
  is_active: boolean;
  evidence_link: string;
  women_non_youth: string | number;
  men_non_youth: string | number;
  showWomenExplanation: boolean;
  other_actor_type: any;
}