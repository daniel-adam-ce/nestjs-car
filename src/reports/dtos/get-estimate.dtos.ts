import { Transform } from "class-transformer";
import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";
import { TransformInt } from "../../decorators/transform-int.decorator";
import { TransformFloat } from "../../decorators/transform-float.decorator";

export class GetEstimateDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @TransformInt()
    @IsNumber()
    @Min(1950)
    @Max(3000)
    year: number;

    @TransformFloat()
    @IsLongitude()
    lng: number;

    @TransformFloat()
    @IsLatitude()
    lat: number;

    @TransformInt()
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;
}