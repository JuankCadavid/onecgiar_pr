import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { HandlersError } from '../../../shared/handlers/error.utils';
import { ResultsImpactAreaTarget } from './entities/results-impact-area-target.entity';
import { GetImpactTargetAreaDto } from './dto/get-impact-target-area.dto';
import {
  ReplicableConfigInterface,
  ReplicableInterface,
} from '../../../shared/globalInterfaces/replicable.interface';

@Injectable()
export class ResultsImpactAreaTargetRepository
  extends Repository<ResultsImpactAreaTarget>
  implements ReplicableInterface<ResultsImpactAreaTarget>
{
  private readonly _logger: Logger = new Logger(
    ResultsImpactAreaTargetRepository.name,
  );

  constructor(
    private dataSource: DataSource,
    private _handlersError: HandlersError,
  ) {
    super(ResultsImpactAreaTarget, dataSource.createEntityManager());
  }

  async replicable(
    config: ReplicableConfigInterface<ResultsImpactAreaTarget>,
  ): Promise<ResultsImpactAreaTarget[]> {
    let final_data: ResultsImpactAreaTarget[] = null;
    try {
      if (config.f?.custonFunction) {
        const queryData = `
        SELECT 
        null as result_impact_area_target_id,
        riat.is_active,
        now() as created_date,
        null as last_updated_date,
        ? as result_id,
        riat.impact_area_target_id,
        ? as created_by,
        null as last_updated_by
        from results_impact_area_target riat where riat.result_id = ? and rbi.is_active > 0
        `;
        const response = await (<Promise<ResultsImpactAreaTarget[]>>(
          this.query(queryData, [
            config.new_result_id,
            config.user.id,
            config.old_result_id,
          ])
        ));
        const response_edit = <ResultsImpactAreaTarget[]>(
          config.f.custonFunction(response)
        );
        final_data = await this.save(response_edit);
      } else {
        const queryData: string = `
        insert into results_impact_area_target
        (
        is_active,
        created_date,
        last_updated_date,
        result_id,
        impact_area_target_id,
        created_by,
        last_updated_by
        )
        SELECT 
        riat.is_active,
        now() as created_date,
        null as last_updated_date,
        ? as result_id,
        riat.impact_area_target_id,
        ? as created_by,
        null as last_updated_by
        from results_impact_area_target riat where riat.result_id = ? and rbi.is_active > 0`;
        await this.query(queryData, [
          config.new_result_id,
          config.user.id,
          config.old_result_id,
        ]);

        const queryFind = `
        SELECT 
        riat.result_impact_area_target_id,
        riat.is_active,
        riat.created_date,
        riat.last_updated_date,
        riat.result_id,
        riat.impact_area_target_id,
        riat.created_by,
        riat.last_updated_by
        from results_impact_area_target riat where riat.result_id = ?`;
        final_data = await this.query(queryFind, [config.new_result_id]);
      }
    } catch (error) {
      config.f?.errorFunction
        ? config.f.errorFunction(error)
        : this._logger.error(error);
      final_data = null;
    }

    config.f?.completeFunction
      ? config.f.completeFunction({ ...final_data })
      : null;

    return final_data;
  }

  async resultsImpactAreaTargetExists(resultId: number, targetId: number) {
    const queryData = `
    SELECT
      riat.result_impact_area_target_id,
      riat.is_active,
      riat.created_date,
      riat.last_updated_date,
      riat.result_id,
      riat.impact_area_target_id,
      riat.created_by,
      riat.last_updated_by
    FROM
      results_impact_area_target riat
    WHERE
      riat.result_id = ?
      and riat.impact_area_target_id = ?;
    `;
    try {
      const resultTocResult: ResultsImpactAreaTarget[] = await this.query(
        queryData,
        [resultId, targetId],
      );
      return resultTocResult.length ? resultTocResult[0] : undefined;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: ResultsImpactAreaTargetRepository.name,
        error: error,
        debug: true,
      });
    }
  }

  async resultsImpactAreaTargetByResultId(resultId: number) {
    const queryData = `
    SELECT
      riat.result_impact_area_target_id,
      riat.is_active,
      riat.created_date,
      riat.last_updated_date,
      riat.result_id,
      riat.impact_area_target_id as targetId,
      riat.created_by,
      riat.last_updated_by,
      cgt.impactAreaId as impact_area_id,
      cgt.target 
    FROM
      results_impact_area_target riat
      inner join clarisa_global_targets cgt ON cgt.targetId = riat.impact_area_target_id 
    WHERE
      riat.result_id = ?
      and riat.is_active > 0;
    `;
    try {
      const resultTocResult: GetImpactTargetAreaDto[] = await this.query(
        queryData,
        [resultId],
      );
      return resultTocResult;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: ResultsImpactAreaTargetRepository.name,
        error: error,
        debug: true,
      });
    }
  }

  async updateResultImpactAreaTarget(
    resultId: number,
    impactId: number,
    targetId: number[],
    userId: number,
  ) {
    const target = targetId ?? [];
    const upDateInactive = `
    update results_impact_area_target riat
    inner join clarisa_global_targets cgt on cgt.targetId = riat.impact_area_target_id  
    inner join clarisa_impact_areas cia on cia.id = cgt.impactAreaId 
      set riat.is_active  = 0,
        riat.last_updated_date  = NOW(),
        riat.last_updated_by  = ?
      where riat.is_active > 0 
        and riat.result_id  = ?
        and riat.impact_area_target_id  not in (${target.toString()})
        and cia.id = ?;
    `;

    const upDateActive = `
    update results_impact_area_target riat
    inner join clarisa_global_targets cgt on cgt.targetId = riat.impact_area_target_id  
    inner join clarisa_impact_areas cia on cia.id = cgt.impactAreaId 
      set riat.is_active  = 1,
        riat.last_updated_date  = NOW(),
        riat.last_updated_by  = ?
      where riat.result_id  = ?
        and riat.impact_area_target_id in (${target.toString()})
        and cia.id = ?;
    `;

    const upDateAllInactive = `
    update results_impact_area_target riat
    inner join clarisa_global_targets cgt on cgt.targetId = riat.impact_area_target_id  
    inner join clarisa_impact_areas cia on cia.id = cgt.impactAreaId 
      set riat.is_active  = 0,
        riat.last_updated_date  = NOW(),
        riat.last_updated_by  = ?
      where riat.is_active > 0 
        and riat.result_id  = ?
        and cia.id = ?;
    `;

    try {
      if (target?.length) {
        const upDateInactiveResult = await this.query(upDateInactive, [
          userId,
          resultId,
          impactId,
        ]);

        return await this.query(upDateActive, [userId, resultId, impactId]);
      } else {
        return await this.query(upDateAllInactive, [
          userId,
          resultId,
          impactId,
        ]);
      }
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: ResultsImpactAreaTargetRepository.name,
        error: `updateResultByInitiative ${error}`,
        debug: true,
      });
    }
  }
}
