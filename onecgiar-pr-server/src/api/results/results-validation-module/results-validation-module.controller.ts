import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { ResultsValidationModuleService } from './results-validation-module.service';
import { CreateResultsValidationModuleDto } from './dto/create-results-validation-module.dto';
import { UpdateResultsValidationModuleDto } from './dto/update-results-validation-module.dto';

@Controller()
export class ResultsValidationModuleController {
  constructor(private readonly resultsValidationModuleService: ResultsValidationModuleService) {}

  @Post()
  create(@Body() createResultsValidationModuleDto: CreateResultsValidationModuleDto) {
    return this.resultsValidationModuleService.create(createResultsValidationModuleDto);
  }

  @Get('get/green-checks/:resultId')
  async findAll(@Param('resultId') resultId: number) {
    const {message, response, status} = await this.resultsValidationModuleService.getGreenchecksByResult(resultId);
    throw new HttpException({ message, response }, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultsValidationModuleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResultsValidationModuleDto: UpdateResultsValidationModuleDto) {
    return this.resultsValidationModuleService.update(+id, updateResultsValidationModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultsValidationModuleService.remove(+id);
  }
}