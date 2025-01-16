import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report) private repo: Repository<Report>
    ) {  }

    async create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create(reportDto)
        report.user = user;
        return this.repo.save(report);
    }

    async changeApproval(approved: boolean, id: number) {
        const report = await this.repo.findOne({
            where: {
                id: id
            }
        })

        if (!report) throw new NotFoundException("report not found");
        report.approved = approved

        return this.repo.save(report);
    }
}
