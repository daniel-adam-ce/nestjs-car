import { Transform } from "class-transformer";

export const TransformInt = () => {
    return Transform(({ value }) => {
        return parseInt(value);
    })
}