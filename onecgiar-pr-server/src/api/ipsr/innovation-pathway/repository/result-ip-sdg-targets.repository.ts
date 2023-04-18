import { Injectable } from "@nestjs/common";
import { HandlersError } from "src/shared/handlers/error.utils";
import { DataSource, Repository } from "typeorm";
import { ResultIpSdgTargets } from "../entities/result-ip-sdg-targets.entity";


@Injectable()
export class ResultIpSdgTargetRepository extends Repository<ResultIpSdgTargets>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError,
    ) {
        super(ResultIpSdgTargets, dataSource.createEntityManager())
    }

    async getSdgs(resultByInnovationPackageId: number) {
        const query = `
        SELECT 
            ris.clarisa_sdg_target_id AS id,
            (
                SELECT
                    cst.sdg_target_code
                FROM
                    clarisa_sdgs_targets cst
                WHERE cst.id = ris.clarisa_sdg_target_id
            ) AS sdg_target_code,
            (
                SELECT
                    cst.sdg_target
                FROM
                    clarisa_sdgs_targets cst
                WHERE cst.id = ris.clarisa_sdg_target_id
            ) AS sdg_target
        FROM
            result_ip_sdg_targets ris
        WHERE ris.is_active > 0
            AND result_by_innovation_package_id = ?
        `;

        try {
            const sdgsTarget: ResultIpSdgTargets[] = await this.query(query, [resultByInnovationPackageId]);
            return sdgsTarget;
        } catch (error) {
            throw this._handlersError.returnErrorRepository({
                className: ResultIpSdgTargetRepository.name,
                error: error,
                debug: true,
            });
        }
    }

    async getSdgsByIpAndSdgId(resultByInnovationPackageId: number, sdgId: number) {
        const query = `
        SELECT 
            *
        FROM
            result_ip_sdg_targets ris
        WHERE ris.is_active > 0
            AND result_by_innovation_package_id = ?
            AND clarisa_sdg_target_id = ?
        `;

        try {
            const sdgsTarget: ResultIpSdgTargets[] = await this.query(query, [resultByInnovationPackageId, sdgId]);
            return sdgsTarget?.length ? sdgsTarget[0] : undefined;
        } catch (error) {
            throw this._handlersError.returnErrorRepository({
                className: ResultIpSdgTargetRepository.name,
                error: error,
                debug: true,
            });
        }
    }

    async updateSdg(resultByInnovationPackageId: number, sdgsArray: number[], user: number) {
        const sdgs = sdgsArray ?? [];

        const updateInactive = `
        UPDATE
            result_ip_sdg_targets
        SET
            is_active = 0,
            last_updated_date = NOW(),
            last_updated_by = ${user}
        WHERE is_active > 0
            AND result_by_innovation_package_id = ?
            AND clarisa_sdg_target_id NOT IN (${sdgs});
        `;

        const updateActive = `
        UPDATE
            result_ip_sdg_targets
        SET
            is_active = 1,
            last_updated_date = NOW(),
            last_updated_by = ${user}
        WHERE result_by_innovation_package_id = ?
            AND clarisa_sdg_target_id IN (${sdgs});
        `;

        const updateAllInactive = `
        UPDATE
            result_ip_sdg_targets
        SET
            is_active = 0,
            last_updated_date = NOW(),
            last_updated_by = ${user}
        WHERE result_by_innovation_package_id = ?;
        `;

        try {
            if (sdgs?.length) {
                await this.query(updateInactive, [
                    resultByInnovationPackageId
                ]);

                return await this.query(updateActive, [
                    resultByInnovationPackageId
                ]);
            } else {
                return await this.query(updateAllInactive, [
                    resultByInnovationPackageId
                ]);
            }
        } catch (error) {
            throw this._handlersError.returnErrorRepository({
                className: ResultIpSdgTargetRepository.name,
                error: `Update SDGs ${error}`,
                debug: true,
            });
        }
    }
}