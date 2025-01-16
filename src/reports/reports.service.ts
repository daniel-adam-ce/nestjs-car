import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report) private repo: Repository<Report>
    ) {  }

    async create(reportDto: CreateReportDto) {
        const report = this.repo.create(reportDto)
        return this.repo.save(report);
    }
}
