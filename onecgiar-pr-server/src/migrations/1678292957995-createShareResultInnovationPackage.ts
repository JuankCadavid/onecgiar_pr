import { MigrationInterface, QueryRunner } from "typeorm";

export class createShareResultInnovationPackage1678292957995 implements MigrationInterface {
    name = 'createShareResultInnovationPackage1678292957995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` DROP FOREIGN KEY \`FK_b63db7b87b4f510ef29c37596c2\``);
        await queryRunner.query(`CREATE TABLE \`share_result_innovation_package_request\` (\`share_result_innovation_package_request_id\` bigint NOT NULL AUTO_INCREMENT, \`result_package_id\` bigint NOT NULL, \`owner_initiative_id\` int NOT NULL, \`shared_inititiative_id\` int NOT NULL, \`approving_inititiative_id\` int NOT NULL, \`toc_result_id\` int NULL, \`action_area_outcome_id\` int NULL, \`request_status_id\` int NOT NULL, \`requested_by\` int NOT NULL, \`approved_by\` int NULL, \`planned_result\` tinyint NULL, \`requester_initiative_id\` int NULL, \`requested_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`aprovaed_date\` timestamp NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`share_result_innovation_package_request_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_countries\` DROP COLUMN \`create_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_countries\` DROP COLUMN \`create_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_countries\` DROP COLUMN \`last_update_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_countries\` DROP COLUMN \`last_update_date\``);
        await queryRunner.query(`ALTER TABLE \`non_pooled_innovation_package_project\` DROP COLUMN \`create_by\``);
        await queryRunner.query(`ALTER TABLE \`non_pooled_innovation_package_project\` DROP COLUMN \`create_date\``);
        await queryRunner.query(`ALTER TABLE \`non_pooled_innovation_package_project\` DROP COLUMN \`last_update_by\``);
        await queryRunner.query(`ALTER TABLE \`non_pooled_innovation_package_project\` DROP COLUMN \`last_update_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_center\` DROP COLUMN \`create_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_center\` DROP COLUMN \`create_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_center\` DROP COLUMN \`last_update_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_center\` DROP COLUMN \`last_update_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_region\` DROP COLUMN \`create_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_region\` DROP COLUMN \`create_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_region\` DROP COLUMN \`last_update_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_region\` DROP COLUMN \`last_update_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_by_initiative\` DROP COLUMN \`create_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_by_initiative\` DROP COLUMN \`create_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_by_initiative\` DROP COLUMN \`last_update_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_by_initiative\` DROP COLUMN \`last_update_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` DROP COLUMN \`create_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` DROP COLUMN \`create_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` DROP COLUMN \`last_update_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` DROP COLUMN \`last_update_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` DROP COLUMN \`create_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` DROP COLUMN \`create_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` DROP COLUMN \`krs_url\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` DROP COLUMN \`last_update_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` DROP COLUMN \`last_update_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` DROP COLUMN \`lead_contact_person\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` DROP COLUMN \`reported_year_id\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_countries\` ADD \`created_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_countries\` ADD \`last_updated_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_countries\` ADD \`created_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_countries\` ADD \`last_updated_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`non_pooled_innovation_package_project\` ADD \`created_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`non_pooled_innovation_package_project\` ADD \`last_updated_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`non_pooled_innovation_package_project\` ADD \`created_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`non_pooled_innovation_package_project\` ADD \`last_updated_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_center\` ADD \`created_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_center\` ADD \`last_updated_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_center\` ADD \`created_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_center\` ADD \`last_updated_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_region\` ADD \`created_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_region\` ADD \`last_updated_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_region\` ADD \`created_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_region\` ADD \`last_updated_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_by_initiative\` ADD \`created_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_by_initiative\` ADD \`last_updated_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_by_initiative\` ADD \`created_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_by_initiative\` ADD \`last_updated_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` ADD \`created_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` ADD \`last_updated_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` ADD \`created_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` ADD \`last_updated_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` ADD \`initiative_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` ADD \`created_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` ADD \`last_updated_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` ADD \`created_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` ADD \`last_updated_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` DROP FOREIGN KEY \`FK_f41ff6ec294e044f2c2fa84635d\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` CHANGE \`toc_result_id\` \`toc_result_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` CHANGE \`planned_result_packages\` \`planned_result_packages\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` ADD CONSTRAINT \`FK_1c95e7ed3a300d54c3bacc18993\` FOREIGN KEY (\`initiative_id\`) REFERENCES \`clarisa_initiatives\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` ADD CONSTRAINT \`FK_f41ff6ec294e044f2c2fa84635d\` FOREIGN KEY (\`toc_result_id\`) REFERENCES \`toc_result\`(\`toc_result_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` ADD CONSTRAINT \`FK_de87352c7ddbb727c9ab5121fc6\` FOREIGN KEY (\`result_package_id\`) REFERENCES \`results_innovation_package\`(\`result_innovation_package_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` ADD CONSTRAINT \`FK_30297ef1d3344717a6f270fb76d\` FOREIGN KEY (\`owner_initiative_id\`) REFERENCES \`clarisa_initiatives\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` ADD CONSTRAINT \`FK_cc0fce5e7781a35beb83e56ed0a\` FOREIGN KEY (\`shared_inititiative_id\`) REFERENCES \`clarisa_initiatives\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` ADD CONSTRAINT \`FK_eb531131066d6acccbe63046ad5\` FOREIGN KEY (\`approving_inititiative_id\`) REFERENCES \`clarisa_initiatives\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` ADD CONSTRAINT \`FK_b7bcec699f0cfccd9b4467584b4\` FOREIGN KEY (\`requester_initiative_id\`) REFERENCES \`clarisa_initiatives\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` ADD CONSTRAINT \`FK_7a37481381ebbc7aceda03cfd1b\` FOREIGN KEY (\`toc_result_id\`) REFERENCES \`toc_result\`(\`toc_result_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` ADD CONSTRAINT \`FK_5d05d9a64baaa8cfbc212901ab2\` FOREIGN KEY (\`action_area_outcome_id\`) REFERENCES \`clarisa_action_area_outcome\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` ADD CONSTRAINT \`FK_2151d4b2cec4ba6463088a975e6\` FOREIGN KEY (\`request_status_id\`) REFERENCES \`request_status\`(\`request_status_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` ADD CONSTRAINT \`FK_ff50d52c20252df7922938124d0\` FOREIGN KEY (\`requested_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` ADD CONSTRAINT \`FK_92e68ec67e423e941e04145752e\` FOREIGN KEY (\`approved_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` DROP FOREIGN KEY \`FK_92e68ec67e423e941e04145752e\``);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` DROP FOREIGN KEY \`FK_ff50d52c20252df7922938124d0\``);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` DROP FOREIGN KEY \`FK_2151d4b2cec4ba6463088a975e6\``);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` DROP FOREIGN KEY \`FK_5d05d9a64baaa8cfbc212901ab2\``);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` DROP FOREIGN KEY \`FK_7a37481381ebbc7aceda03cfd1b\``);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` DROP FOREIGN KEY \`FK_b7bcec699f0cfccd9b4467584b4\``);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` DROP FOREIGN KEY \`FK_eb531131066d6acccbe63046ad5\``);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` DROP FOREIGN KEY \`FK_cc0fce5e7781a35beb83e56ed0a\``);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` DROP FOREIGN KEY \`FK_30297ef1d3344717a6f270fb76d\``);
        await queryRunner.query(`ALTER TABLE \`share_result_innovation_package_request\` DROP FOREIGN KEY \`FK_de87352c7ddbb727c9ab5121fc6\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` DROP FOREIGN KEY \`FK_f41ff6ec294e044f2c2fa84635d\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` DROP FOREIGN KEY \`FK_1c95e7ed3a300d54c3bacc18993\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` CHANGE \`planned_result_packages\` \`planned_result_packages\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` CHANGE \`toc_result_id\` \`toc_result_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` ADD CONSTRAINT \`FK_f41ff6ec294e044f2c2fa84635d\` FOREIGN KEY (\`toc_result_id\`) REFERENCES \`toc_result\`(\`toc_result_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` DROP COLUMN \`last_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` DROP COLUMN \`last_updated_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` DROP COLUMN \`created_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` DROP COLUMN \`initiative_id\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` DROP COLUMN \`last_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` DROP COLUMN \`last_updated_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` DROP COLUMN \`created_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_by_initiative\` DROP COLUMN \`last_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_by_initiative\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_by_initiative\` DROP COLUMN \`last_updated_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_by_initiative\` DROP COLUMN \`created_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_region\` DROP COLUMN \`last_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_region\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_region\` DROP COLUMN \`last_updated_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_region\` DROP COLUMN \`created_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_center\` DROP COLUMN \`last_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_center\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_center\` DROP COLUMN \`last_updated_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_center\` DROP COLUMN \`created_date\``);
        await queryRunner.query(`ALTER TABLE \`non_pooled_innovation_package_project\` DROP COLUMN \`last_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`non_pooled_innovation_package_project\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`non_pooled_innovation_package_project\` DROP COLUMN \`last_updated_date\``);
        await queryRunner.query(`ALTER TABLE \`non_pooled_innovation_package_project\` DROP COLUMN \`created_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_countries\` DROP COLUMN \`last_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_countries\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_countries\` DROP COLUMN \`last_updated_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_countries\` DROP COLUMN \`created_date\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` ADD \`status\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` ADD \`reported_year_id\` year NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` ADD \`lead_contact_person\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` ADD \`last_update_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` ADD \`last_update_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` ADD \`krs_url\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` ADD \`create_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` ADD \`create_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` ADD \`last_update_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` ADD \`last_update_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` ADD \`create_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_toc_result\` ADD \`create_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_by_initiative\` ADD \`last_update_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_by_initiative\` ADD \`last_update_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_by_initiative\` ADD \`create_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_by_initiative\` ADD \`create_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_region\` ADD \`last_update_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_region\` ADD \`last_update_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_region\` ADD \`create_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_region\` ADD \`create_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_center\` ADD \`last_update_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_center\` ADD \`last_update_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_center\` ADD \`create_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_center\` ADD \`create_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`non_pooled_innovation_package_project\` ADD \`last_update_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`non_pooled_innovation_package_project\` ADD \`last_update_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`non_pooled_innovation_package_project\` ADD \`create_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`non_pooled_innovation_package_project\` ADD \`create_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_countries\` ADD \`last_update_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_countries\` ADD \`last_update_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_countries\` ADD \`create_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package_countries\` ADD \`create_by\` bigint NULL`);
        await queryRunner.query(`DROP TABLE \`share_result_innovation_package_request\``);
        await queryRunner.query(`ALTER TABLE \`results_innovation_package\` ADD CONSTRAINT \`FK_b63db7b87b4f510ef29c37596c2\` FOREIGN KEY (\`reported_year_id\`) REFERENCES \`year\`(\`year\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
