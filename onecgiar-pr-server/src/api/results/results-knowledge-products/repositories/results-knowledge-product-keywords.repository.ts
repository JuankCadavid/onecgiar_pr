import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ResultsKnowledgeProductKeyword } from '../entities/results-knowledge-product-keywords.entity';
import { HandlersError } from '../../../../shared/handlers/error.utils';
import {
  ReplicableConfigInterface,
  ReplicableInterface,
} from '../../../../shared/globalInterfaces/replicable.interface';
import { VERSIONING } from 'src/shared/utils/versioning.utils';
import { LogicalDelete } from '../../../../shared/globalInterfaces/delete.interface';

@Injectable()
export class ResultsKnowledgeProductKeywordRepository
  extends Repository<ResultsKnowledgeProductKeyword>
  implements
    ReplicableInterface<ResultsKnowledgeProductKeyword>,
    LogicalDelete<ResultsKnowledgeProductKeyword>
{
  private readonly _logger: Logger = new Logger(
    ResultsKnowledgeProductKeywordRepository.name,
  );

  constructor(
    private dataSource: DataSource,
    private readonly _handlersError: HandlersError,
  ) {
    super(ResultsKnowledgeProductKeyword, dataSource.createEntityManager());
  }

  logicalDelete(resultId: number): Promise<ResultsKnowledgeProductKeyword> {
    const queryData = `update results_kp_keywords rkk 
    inner join results_knowledge_product rkp on rkk.result_knowledge_product_id = rkp.result_knowledge_product_id 
  set rkk.is_active = 0
  where rkp.results_id = ?
    and rkk.is_active > 0;`;
    return this.query(queryData, [resultId])
      .then((res) => res)
      .catch((err) =>
        this._handlersError.returnErrorRepository({
          error: err,
          className: ResultsKnowledgeProductKeywordRepository.name,
          debug: true,
        }),
      );
  }

  async replicable(
    config: ReplicableConfigInterface<ResultsKnowledgeProductKeyword>,
  ): Promise<ResultsKnowledgeProductKeyword> {
    let final_data: ResultsKnowledgeProductKeyword = null;
    try {
      if (config.f?.custonFunction) {
        const queryData = `
        SELECT
        null as result_kp_keyword_id,
        rkpk.keyword,
        rkpk.is_agrovoc,
        rkpk.is_active,
        now() as created_date,
        null as last_updated_date,
        ${VERSIONING.QUERY.Get_kp_phases(
          config.new_result_id,
        )} as result_knowledge_product_id,
        ? as created_by,
        null as last_updated_by
        from results_kp_keywords rkpk where rkpk.result_knowledge_product_id = ${VERSIONING.QUERY.Get_kp_phases(
          config.old_result_id,
        )} and rkpk.is_active > 0
        `;
        const response = await (<Promise<ResultsKnowledgeProductKeyword[]>>(
          this.query(queryData, [config.user.id])
        ));
        const response_edit = <ResultsKnowledgeProductKeyword>(
          config.f.custonFunction(response?.length ? response[0] : null)
        );
        final_data = await this.save(response_edit);
      } else {
        const queryData: string = `
        insert into results_kp_keywords 
        (
        keyword,
        is_agrovoc,
        is_active,
        created_date,
        last_updated_date,
        result_knowledge_product_id,
        created_by,
        last_updated_by
        )
        SELECT
        rkpk.keyword,
        rkpk.is_agrovoc,
        rkpk.is_active,
        now() as created_date,
        null as last_updated_date,
        ${VERSIONING.QUERY.Get_kp_phases(
          config.new_result_id,
        )} as result_knowledge_product_id,
        ? as created_by,
        null as last_updated_by
        from results_kp_keywords rkpk where rkpk.result_knowledge_product_id = ${VERSIONING.QUERY.Get_kp_phases(
          config.old_result_id,
        )} and rkpk.is_active > 0`;
        await this.query(queryData, [config.user.id]);

        const queryFind = `
        SELECT 
        rkpk.result_kp_keyword_id,
        rkpk.keyword,
        rkpk.is_agrovoc,
        rkpk.is_active,
        rkpk.created_date,
        rkpk.last_updated_date,
        rkpk.result_knowledge_product_id,
        rkpk.created_by,
        rkpk.last_updated_by
        from results_kp_keywords rkpk where rkpk.result_knowledge_product_id = ${VERSIONING.QUERY.Get_kp_phases(
          config.new_result_id,
        )}`;
        const temp = await (<Promise<ResultsKnowledgeProductKeyword[]>>(
          this.query(queryFind)
        ));
        final_data = temp?.length ? temp[0] : null;
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

  async statusElement(kpId: number, status: boolean) {
    const query = `
    UPDATE results_kp_keywords  
    SET is_active  = ?
    WHERE result_knowledge_product_id = ?;
    `;
    try {
      return await this.query(query, [status ? 1 : 0, kpId]);
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: ResultsKnowledgeProductKeywordRepository.name,
        error: error,
        debug: true,
      });
    }
  }
}
