import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { HandlersError } from '../../../shared/handlers/error.utils';
import { ResultsByInstitutionType } from './entities/results_by_institution_type.entity';

@Injectable()
export class ResultByIntitutionsTypeRepository extends Repository<ResultsByInstitutionType> {
  constructor(
    private dataSource: DataSource,
    private readonly _handlersError: HandlersError,
  ) {
    super(ResultsByInstitutionType, dataSource.createEntityManager());
  }

  async getResultByInstitutionTypeFull(resultId: number) {
    const queryData = `
    select 
    	rbit.id,
    	rbit .institution_types_id,
    	rbit.institution_roles_id,
    	rbit.version_id
    from results_by_institution_type rbit
    where rbit.results_id  = ?
    	and rbit.is_active > 0;
    `;
    try {
      const completeUser: ResultsByInstitutionType[] = await this.query(
        queryData,
        [resultId],
      );
      return completeUser;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: ResultByIntitutionsTypeRepository.name,
        error: error,
        debug: true,
      });
    }
  }

  async getResultByInstitutionTypeActorFull(resultId: number) {
    const queryData = `
    select 
    	rbit.id,
    	rbit .institution_types_id,
    	rbit.institution_roles_id,
    	rbit.version_id
    from results_by_institution_type rbit
    where rbit.results_id  = ?
      and rbit.institution_roles_id = 1
    	and rbit.is_active > 0;
    `;
    try {
      const completeUser: ResultsByInstitutionType[] = await this.query(
        queryData,
        [resultId],
      );
      return completeUser;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: ResultByIntitutionsTypeRepository.name,
        error: error,
        debug: true,
      });
    }
  }

  async getResultByInstitutionTypePartnersFull(resultId: number) {
    const queryData = `
    select 
    	rbit.id,
    	rbit .institution_types_id,
    	rbit.institution_roles_id,
    	rbit.version_id
    from results_by_institution_type rbit
    where rbit.results_id  = ?
      and rbit.institution_roles_id = 2
    	and rbit.is_active > 0;
    `;
    try {
      const completeUser: ResultsByInstitutionType[] = await this.query(
        queryData,
        [resultId],
      );
      return completeUser;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: ResultByIntitutionsTypeRepository.name,
        error: error,
        debug: true,
      });
    }
  }

  async getResultByInstitutionTypeExists(resultId: number, institutionsTypeId: number) {
    const queryData = `
    select 
    	rbit.id,
    	rbit .institution_types_id,
    	rbit.is_active,
    	rbit.creation_date,
    	rbit.last_updated_date,
    	rbit.results_id,
    	rbit.institution_roles_id,
    	rbit.version_id,
    	rbit.created_by,
    	rbit.last_updated_by 
    from results_by_institution_type rbit
    where rbit.results_id  = ?
      and rbit.institution_types_id = ?;;
    `;
    try {
      const completeUser: ResultsByInstitutionType[] = await this.query(
        queryData,
        [resultId, institutionsTypeId],
      );
      return completeUser?.length?completeUser[0]:undefined;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: ResultByIntitutionsTypeRepository.name,
        error: error,
        debug: true,
      });
    }
  }

  async logicalElimination(resultId: number) {
    const queryData = `
    update results_by_institution_type 
    set is_active = false
    where results_id = ?;
    `;
    try {
      const completeUser: any[] = await this.query(queryData, [resultId]);
      return completeUser;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: ResultByIntitutionsTypeRepository.name,
        error: error,
        debug: true,
      });
    }
  }

  async updateIstitutionsType(resultId: number, institutions: number[], isActor: boolean, userId: number) {
    const upDateInactive = `
    update results_by_institution_type  
    set is_active = 0, 
    	last_updated_date = NOW(), 
    	last_updated_by = ? 
    where is_active > 0 
    	and results_id = ?
      and institution_roles_id = ?
    	and institution_types_id not in (${institutions.toString()});
    `;

    const upDateActive = `
    update results_by_institution_type  
    set is_active = 1, 
    	last_updated_date = NOW(), 
    	last_updated_by = ? 
    where results_id = ?
      and institution_roles_id = ?
    	and institution_types_id in (${institutions.toString()});
    `;

    const upDateAllInactive = `
    update results_by_institution_type  
    set is_active = 0, 
    	last_updated_date = NOW(), 
    	last_updated_by = ? 
    where is_active > 0
      and results_id = ?
      and institution_roles_id = ?;
    `;
    try {
      if(institutions.length){
        const upDateInactiveResult = await this.query(upDateInactive, [
          userId, resultId, isActor?1:2
        ]);
  
        return await this.query(upDateActive, [
          userId, resultId, isActor?1:2
        ]);
      }else{
        return await this.query(upDateAllInactive, [
          userId, resultId, isActor?1:2
        ]);
      }
      
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: ResultByIntitutionsTypeRepository.name,
        error: error,
        debug: true,
      });
    }
  }
}
