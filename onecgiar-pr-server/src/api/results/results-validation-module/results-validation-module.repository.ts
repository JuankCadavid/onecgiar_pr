import { Injectable } from '@nestjs/common';
import { DataSource, Repository, QueryRunner } from 'typeorm';
import { HandlersError } from '../../../shared/handlers/error.utils';

@Injectable()
export class resultValidationRepository{
	private readonly _queryRunner = this.dataSource.createQueryRunner();
  constructor(
    private dataSource: DataSource,
    private _handlersError: HandlersError
  ) {
  }

  async generalInformationValidation(resultId: number, resultLevel: number) {
    const queryData = `
    SELECT
		'general-information' as section_name,
		CASE
			when (r.title is not null
			and r.title <> '')
			and 
		 	(r.description is not null
			and r.description <> '')
			and 
		 	(r.gender_tag_level_id is not null
			and r.gender_tag_level_id <> '')
			and 
		 	(r.climate_change_tag_level_id is not null
			and r.climate_change_tag_level_id <> '')
			and 
		 	(r.is_krs in (0, 1))
			${resultLevel != 4?`and 
		 	((
			select
				COUNT(rbi.id)
			from
				results_by_institution rbi
			WHERE
				rbi.institution_roles_id = 1
				and rbi.result_id = r.id
				and rbi.is_active > 0) > 0)`:``}
		 then true
			else false
		END as validation
	FROM
		\`result\` r
	WHERE
		r.id = ?
		and r.is_active > 0;
    `;
    try {
      const shareResultRequest: GetValidationSectionDto[] = await this._queryRunner.query(queryData, [resultId]);
      return shareResultRequest.length ? shareResultRequest[0] : undefined;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: resultValidationRepository.name,
        error: error,
        debug: true,
      });
    }
  }

  async tocValidation(resultId: number) {
    const queryData = `
    SELECT 
		'theory-of-change' as section_name,
		CASE 
			when 
			((
			select
				COUNT(rc.id)
			from
				results_center rc
			WHERE
				rc.is_active > 0
				and rc.result_id = r.id) > 0)
			AND 
			((
			SELECT
				rtr.planned_result
			FROM
				results_toc_result rtr
			WHERE
				rtr.initiative_id in (rbi.inititiative_id)
					and rtr.results_id = r.id
					and rtr.is_active > 0) is not null)
			AND 
			((
			select
				if(rtr.toc_result_id is not null
					or rtr.action_area_outcome_id is not null,
					1,
					0)
			from
				results_toc_result rtr
			WHERE
				rtr.initiative_id in (rbi.inititiative_id)
					and rtr.results_id = r.id
					and rtr.is_active > 0) = 1)
			AND 
			(((
			IFNULL((select
				sum(if(rtr.toc_result_id is not null or rtr.action_area_outcome_id is not null, 1, 0))
			from
				results_toc_result rtr
			WHERE
				rtr.initiative_id not in (rbi.inititiative_id)
					and rtr.results_id = r.id
					and rtr.is_active > 0), 0)) -
			(
			select
				COUNT(rbi.id)
			from
				results_by_inititiative rbi
			WHERE
				rbi.result_id = r.id
				and rbi.initiative_role_id = 2
				and rbi.is_active > 0)) = 0)
			AND 
			((
			select
				sum(if(npp.funder_institution_id is not null and npp.funder_institution_id <> '' AND 
							npp.grant_title is not null and npp.grant_title <> '' AND
							npp.lead_center_id is not null and npp.lead_center_id <> '', 1, 0)) - COUNT(npp.id)
			from
				non_pooled_project npp
			WHERE
				npp.results_id = r.id
				and npp.is_active > 0) = 0)
			then true
			else false
		END as validation
	from
		\`result\` r
	inner join results_by_inititiative rbi on
		rbi.result_id = r.id
		and rbi.initiative_role_id = 1
	WHERE
		r.id = ?
		and r.is_active > 0;
    `;
    try {
      const shareResultRequest: GetValidationSectionDto[] = await this._queryRunner.query(queryData, [resultId]);
      return shareResultRequest.length ? shareResultRequest[0] : undefined;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: resultValidationRepository.name,
        error: error,
        debug: true,
      });
    }
  }

  async partnersValidation(resultId: number) {
    const queryData = `
    select
		'partners' as section_name,
		CASE
			when r.no_applicable_partner = 1 then true
			else (case
				when 
				((
				SELECT
					COUNT(rbi.id)
				FROM
					results_by_institution rbi
				WHERE
					rbi.result_id = r.id
					and rbi.institution_roles_id = 2
					and rbi.is_active > 0) > 0) THEN true
				else false
			end)
		END as validation
	from
		\`result\` r
	WHERE
		r.id = ?
		and r.is_active > 0;

    `;
    try {
      const shareResultRequest: GetValidationSectionDto[] = await this._queryRunner.query(queryData, [resultId]);
      return shareResultRequest.length ? shareResultRequest[0] : undefined;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: resultValidationRepository.name,
        error: error,
        debug: true,
      });
    }
  }

  async geoLocationValidation(resultId: number) {
    const queryData = `
    select
		'geographic-location' as section_name,
		CASE
			when ((if(r.has_regions = 1 ,
			((
			select
						count(rr.result_region_id)
			from
						result_region rr
			WHERE
						rr.result_id = r.id
				and rr.is_active > 0) > 0),
			1))
			AND 
					(if(r.has_countries = 1 ,
			((
			select
						count(rc.result_country_id)
			from
						result_country rc
			WHERE
						rc.result_id = r.id
				and rc.is_active > 0) > 0),
			1))) then true
			else false
		END as validation
	from
		\`result\` r
	WHERE
		r.id = ?
		and r.is_active > 0;
    `;
    try {
      const shareResultRequest: GetValidationSectionDto[] = await this._queryRunner.query(queryData, [resultId]);
      return shareResultRequest.length ? shareResultRequest[0] : undefined;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: resultValidationRepository.name,
        error: error,
        debug: true,
      });
    }
  }

  async linksResultsValidation(resultId: number) {
    const queryData = `
	
    `;
    try {
      const shareResultRequest: GetValidationSectionDto[] = await this._queryRunner.query(queryData, [resultId]);
      return shareResultRequest.length ? shareResultRequest[0] : undefined;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: resultValidationRepository.name,
        error: error,
        debug: true,
      });
    }
  }

  async evidenceValidation(resultId: number) {
    const queryData = `
	SELECT
		'evidences' as section_name,
		CASE
			when ((
			SELECT
				if((sum(if(e.link is not null and e.link <> '', 1, 0)) - count(e.id)) is null,
				0,
				(sum(if(e.link is not null and e.link <> '', 1, 0)) - count(e.id)))
			from
				evidence e
			where
				e.result_id = r.id 
				and e.is_supplementary = 0
				and e.is_active > 0) = 0)
			and
		((
			SELECT
				if((sum(if(e.link is not null and e.link <> '', 1, 0)) - count(e.id)) is null,
				0,
				(sum(if(e.link is not null and e.link <> '', 1, 0)) - count(e.id)))
			from
				evidence e
			where
				e.result_id = r.id 
				and e.is_supplementary = 1
				and e.is_active > 0) = 0)
		then TRUE
			else false
		END as validation
	from
		\`result\` r
	WHERE
		r.id = ?
		and r.is_active > 0;
    `;
    try {
      const shareResultRequest: GetValidationSectionDto[] = await this._queryRunner.query(queryData, [resultId]);
      return shareResultRequest.length ? shareResultRequest[0] : undefined;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: resultValidationRepository.name,
        error: error,
        debug: true,
      });
    }
  }

  async innovationUseValidation(resultId: number) {
    const queryData = `
	SELECT
		'innovation-use-info' as section_name,
		CASE
			when (riu.male_using is not null
			and riu.male_using <> '')
			and 
		(riu.female_using is not null
			and riu.female_using <> '')
		then TRUE
			else false
		END as validation
	from
		\`result\` r
	left join results_innovations_use riu on
		riu.results_id = r.id
		and riu.is_active > 0
	WHERE
		r.id = ?
		and r.is_active > 0;
    `;
    try {
      const shareResultRequest: GetValidationSectionDto[] = await this._queryRunner.query(queryData, [resultId]);
      return shareResultRequest.length ? shareResultRequest[0] : undefined;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: resultValidationRepository.name,
        error: error,
        debug: true,
      });
    }
  }

  async innovationDevValidation(resultId: number) {
    const queryData = `
	SELECT
		'innovation-dev-info' as section_name,
		CASE
			when (rid.short_title is not null
			and rid.short_title <> '')
			AND 
			(rid.innovation_characterization_id is not null
			and rid.innovation_characterization_id <> '')
			AND 
			(rid.innovation_nature_id is not null
			and rid.innovation_nature_id <> '')
			AND 
			(rid.is_new_variety is not null
			and rid.is_new_variety <> '')
			AND 
			(rid.innovation_readiness_level_id is not null
			and rid.innovation_readiness_level_id <> '')then true
			else false
		END as validation
	from
		\`result\` r
	left join results_innovations_dev rid on
		rid.results_id = r.id
		and rid.is_active > 0
	WHERE
		r.id = ?
		and r.is_active > 0;
    `;
    try {
      const shareResultRequest: GetValidationSectionDto[] = await this._queryRunner.query(queryData, [resultId]);
      return shareResultRequest.length ? shareResultRequest[0] : undefined;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: resultValidationRepository.name,
        error: error,
        debug: true,
      });
    }
  }

  async capDevValidation(resultId: number) {
    const queryData = `
	SELECT
		'cap-dev-info' as section_name,
		CASE
			when (rcd.female_using is not null
			and rcd.female_using <> '')
			AND 
			(rcd.male_using is not null
			and rcd.male_using <> '')
			AND 
			(rcd.capdev_term_id is not null
			and rcd.capdev_term_id <> '')
			AND 
			((
			SELECT
				count(rbi.id)
			from
				results_by_institution rbi
			WHERE
				rbi.result_id = r.id
				and rbi.institution_roles_id = 3
				and rbi.is_active > 0) > 0)then true
			else false
		END as validation
	from
		\`result\` r
	left join results_capacity_developments rcd on
		rcd.result_id = r.id
		and rcd.is_active > 0
	WHERE
		r.id = ?
		and r.is_active > 0;
    `;
    try {
      const shareResultRequest: GetValidationSectionDto[] = await this._queryRunner.query(queryData, [resultId]);
      return shareResultRequest.length ? shareResultRequest[0] : undefined;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: resultValidationRepository.name,
        error: error,
        debug: true,
      });
    }
  }

  async policyChangeValidation(resultId: number) {
    const queryData = `
	SELECT
		'policy-change1-info' as section_name,
		CASE
			when (rpc.policy_type_id is not null
			and rpc.policy_type_id <> '')
			AND 
			(rpc.policy_stage_id is not null
			and rpc.policy_stage_id <> '')
			AND 
			((
			SELECT
				count(rbi.id)
			from
				results_by_institution rbi
			where
				rbi.result_id = r.id
				and rbi.institution_roles_id = 4
				and rbi.is_active > 0) > 0)
			then TRUE
			else false
		END as validation
	from
		\`result\` r
	left join results_policy_changes rpc on
		rpc.result_id = r.id
		and rpc.is_active > 0
	WHERE
		r.id = ?
		and r.is_active > 0;
    `;
    try {
      const shareResultRequest: GetValidationSectionDto[] = await this._queryRunner.query(queryData, [resultId]);
      return shareResultRequest.length ? shareResultRequest[0] : undefined;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: resultValidationRepository.name,
        error: error,
        debug: true,
      });
    }
  }

}
