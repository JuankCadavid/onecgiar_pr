import { Module } from '@nestjs/common';
import { ClarisaImpactAreaService } from './clarisa-impact-area.service';
import { ClarisaImpactAreaController } from './clarisa-impact-area.controller';
import { RouterModule } from '@nestjs/core';
import { ClarisaImpactAreaRoutes } from './clarisaImpactArea.routes';

@Module({
  controllers: [ClarisaImpactAreaController],
  providers: [ClarisaImpactAreaService],
  imports: [RouterModule.register(ClarisaImpactAreaRoutes)],
})
export class ClarisaImpactAreaModule {}
