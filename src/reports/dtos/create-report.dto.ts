import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReportDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1950)
    @Max(3000)
    year: number;

    @IsLongitude()
    lng: number;

    @IsLatitude()
    lat: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;
}