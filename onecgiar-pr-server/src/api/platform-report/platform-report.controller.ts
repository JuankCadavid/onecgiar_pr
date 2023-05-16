import {
  Controller,
  Get,
  Param,
  Header,
  ParseIntPipe,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { PlatformReportService } from './platform-report.service';
import { CreatePlatformReportDto } from './dto/create-platform-report.dto';
import { UpdatePlatformReportDto } from './dto/update-platform-report.dto';
import { Response } from 'express';
import { DateFormatter } from '../../shared/utils/date-formatter';

@Controller()
export class PlatformReportController {
  constructor(private readonly _platformReportService: PlatformReportService) {}

  @Get('/result/:id')
  async getFullResultReportByResultCode(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const result =
      await this._platformReportService.getFullResultReportByResultCode(id);

    res.set({
      //'Content-Type': 'application/pdf',
      'Content-Disposition': `filename="PRMS-Result-${id}_${result.filename_date}.pdf"`,
    });

    return new StreamableFile(result.pdf, { type: 'application/pdf' });
  }
}