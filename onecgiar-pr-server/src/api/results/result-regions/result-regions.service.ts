import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateResultRegionDto } from './dto/create-result-region.dto';
import { UpdateResultRegionDto } from './dto/update-result-region.dto';
import { HandlersError } from '../../../shared/handlers/error.utils';
import { ResultRegionRepository } from './result-regions.repository';
import { ClarisaGeographicScopeRepository } from '../../../clarisa/clarisa-geographic-scopes/clarisa-geographic-scopes.repository';
import { ResultRepository } from '../result.repository';
import { Result } from '../entities/result.entity';
import { ResultRegion } from './entities/result-region.entity';

@Injectable()
export class ResultRegionsService {

  constructor(
    private readonly _handlersError: HandlersError,
    private readonly _resultRegionRepository: ResultRegionRepository,
    private readonly _resultRepository: ResultRepository,
    private readonly _clarisaGeographicScopeRepository: ClarisaGeographicScopeRepository
  ) { }

  async create(createResultRegionDto: CreateResultRegionDto) {
    try {
      if (!createResultRegionDto?.scope_id) {
        throw {
          response: {},
          message: 'Missing data in the request',
          status: HttpStatus.BAD_REQUEST,
        };
      }
      //!importante hay una tabla por cada uno pero fijo se mandara a un solo enpoint y que el haga el restos
      const result: Result = await this._resultRepository.getResultById(createResultRegionDto.result_id);
      if (!result) {
        throw {
          response: {},
          message: 'Results Not Found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      const regions = createResultRegionDto.regions;
      if(!createResultRegionDto.has_regions && createResultRegionDto.scope_id != 2 || createResultRegionDto.scope_id == 4 || createResultRegionDto.scope_id == 3){
        await this._resultRegionRepository.updateRegions(result.id, []);
      }else if(createResultRegionDto.scope_id == 2 || createResultRegionDto.scope_id == 1 || createResultRegionDto.has_regions){
        if (regions) {
          await this._resultRegionRepository.updateRegions(result.id, createResultRegionDto.regions.map(el => el.id));
          if (regions?.length) {
            let resultRegionArray: ResultRegion[] = [];
            for (let index = 0; index < regions.length; index++) {
              const exist = await this._resultRegionRepository.getResultRegionByResultIdAndRegionId(result.id, regions[index].id);
              if (!exist) {
                const newRegions = new ResultRegion();
                newRegions.region_id = regions[index].id;
                newRegions.result_id = result.id;
                resultRegionArray.push(newRegions);
              }
              await this._resultRegionRepository.save(resultRegionArray);
  
            }
          }
        }
      }
      
      if(createResultRegionDto.scope_id == 4){
        result.geographic_scope_id = 50;
      }else{
        result.geographic_scope_id = createResultRegionDto.scope_id;
      }
      result.has_regions = createResultRegionDto.has_regions;
      await this._resultRepository.save(result);
      
      return {
        response: regions,
        message: 'The data was updated correctly',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlersError.returnErrorRes({ error, debug: true });
    }
  }

  findAll() {
    return `This action returns all resultRegions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resultRegion`;
  }

  update(id: number, updateResultRegionDto: UpdateResultRegionDto) {
    return `This action updates a #${id} resultRegion`;
  }

  remove(id: number) {
    return `This action removes a #${id} resultRegion`;
  }
}
