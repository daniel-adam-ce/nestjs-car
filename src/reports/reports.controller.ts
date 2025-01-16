import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dtos';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@CurrentUser() user: User, @Body() body: CreateReportDto) {
        return this.reportsService.create(body, user);
    }

    @Patch("/:id")
    @UseGuards(AdminGuard)
    changeApproval(@Param("id") id: string, @Body() body: ApproveReportDto) {
        return this.reportsService.changeApproval(body.approved, parseInt(id));
    }

    @Get()
    getEstimate(@Query() query: GetEstimateDto) {
        console.log(query);
    }
}
