import { HttpStatus, Injectable } from '@nestjs/common';
import { HandlersError } from 'src/shared/handlers/error.utils';
import { CreateTypeOneReportDto } from './dto/create-type-one-report.dto';
import { UpdateTypeOneReportDto } from './dto/update-type-one-report.dto';
import { TypeOneReportRepository } from './type-one-report.repository';

@Injectable()
export class TypeOneReportService {

  constructor(
    private readonly _handlersError: HandlersError,
    private readonly _typeOneReportRepository: TypeOneReportRepository
  ){}

  create(createTypeOneReportDto: CreateTypeOneReportDto) {
    return createTypeOneReportDto;
  }

  async getFactSheetByInit(initId: number){
    try {
      const results = await this._typeOneReportRepository.getFactSheetByInit(initId);
      console.log("🚀 ~ file: type-one-report.service.ts:22 ~ TypeOneReportService ~ getFactSheetByInit ~ results", results[0])
      return {
        response: results[0],
        message: 'Successful response',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlersError.returnErrorRes({ error, debug: true });
    }
  }

  findAll() {
    return `This action returns all typeOneReport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeOneReport`;
  }

  update(id: number, updateTypeOneReportDto: UpdateTypeOneReportDto) {
    return `This action updates a #${id} typeOneReport ${updateTypeOneReportDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeOneReport`;
  }
}
