import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ClarisaCenter } from './entities/clarisa-center.entity';

@Injectable()
export class ClarisaCentersRepository extends Repository<ClarisaCenter> {
  constructor(private dataSource: DataSource) {
    super(ClarisaCenter, dataSource.createEntityManager());
  }

  async deleteAllData() {
    const queryData = `
    DELETE FROM clarisa_center;
    `;
    try {
      const deleteData = await this.query(queryData);
      return deleteData;
    } catch (error) {
      throw {
        message: `[${ClarisaCentersRepository.name}] => deleteAllData error: ${error}`,
        response: {},
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async getAllCenters() {
    const queryData = `
    select 
    cc.code ,
    cc.financial_code ,
    cc.institutionId 
    from clarisa_center cc 
`;
    try {
      const centers: ClarisaCenter[] = await this.query(queryData);
      return centers;
    } catch (error) {
      throw {
        message: `[${ClarisaCentersRepository.name}] => deleteAllData error: ${error}`,
        response: {},
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}