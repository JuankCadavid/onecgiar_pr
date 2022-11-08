import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { ClarisaConnectionsService } from './clarisa-connections.service';
import { CreateClarisaConnectionDto } from './dto/create-clarisa-connection.dto';
import { UpdateClarisaConnectionDto } from './dto/update-clarisa-connection.dto';
import { HeadersDto } from '../../shared/globalInterfaces/headers.dto';
import { TokenDto } from '../../shared/globalInterfaces/token.dto';

@Controller()
export class ClarisaConnectionsController {
  constructor(private readonly clarisaConnectionsService: ClarisaConnectionsService) {}

  @Post('partner-request/:resultId')
  create(
    @Body() createClarisaConnectionDto: CreateClarisaConnectionDto,
    @Headers() auth: HeadersDto,
    @Param('resultId') resultId: number
    ) {
    const token: TokenDto = <TokenDto>(
      JSON.parse(Buffer.from(auth.auth.split('.')[1], 'base64').toString())
    );
    return this.clarisaConnectionsService.create(createClarisaConnectionDto, resultId, token);
  }

  @Get('execute-task')
  executeTask() {
    this.clarisaConnectionsService.executeTask();
    return 1;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clarisaConnectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClarisaConnectionDto: UpdateClarisaConnectionDto) {
    return this.clarisaConnectionsService.update(+id, updateClarisaConnectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clarisaConnectionsService.remove(+id);
  }
}
