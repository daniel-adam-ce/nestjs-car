import { Transform } from "class-transformer";

export const TransformFloat = () => {
    return Transform(({ value }) => {
        return parseFloat(value);
    })
};