import { Injectable } from "@nestjs/common";
import { HandlersError } from "src/shared/handlers/error.utils";
import { DataSource, Repository } from "typeorm";
import { ResultIpImpactArea } from "../entities/result-ip-impact-area.entity";


@Injectable()
export class ResultIpImpactAreaRepository extends Repository<ResultIpImpactArea>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError,
    ) {
        super(ResultIpImpactArea, dataSource.createEntityManager())
    }

    async getImpactAreas(resultByInnovationPackageId: number) {
        const query = `
        SELECT 
            riia.impact_area_indicator_id AS targetId,
            cia.description  AS target
        FROM
            result_ip_impact_area_target riia
            LEFT JOIN clarisa_impact_area_indicator ciai ON ciai.id = riia.impact_area_indicator_id
            LEFT JOIN clarisa_impact_areas cia ON cia.id = ciai.impact_area_id
        WHERE riia.is_active > 0
            AND riia.result_by_innovation_package_id = ?
        `;
    
        try {
          const impactAreas: any[] = await this.query(query, [resultByInnovationPackageId]);
          return impactAreas;
        } catch (error) {
          throw this._handlersError.returnErrorRepository({
            className: ResultIpImpactAreaRepository.name,
            error: error,
            debug: true,
          });
        }
      }
}