import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dtos';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report) private repo: Repository<Report>
    ) { }

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

    async getEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
        return this.repo.createQueryBuilder()
            .select("AVG(price)", "price")
            .where("make = :make", { make: make })
            .andWhere("model = :model", { model: model })
            .andWhere("lng - :lng BETWEEN -5 and 5", { lng })
            .andWhere("lat - :lat BETWEEN -5 and 5", { lat })
            .andWhere("year - :year BETWEEN -3 and 3", { year })
            .andWhere("approved IS TRUE")
            .orderBy("ABS(mileage - :mileage)", "DESC")
            .setParameters({ mileage })
            .limit(3)
            .getRawOne()
    }
}
