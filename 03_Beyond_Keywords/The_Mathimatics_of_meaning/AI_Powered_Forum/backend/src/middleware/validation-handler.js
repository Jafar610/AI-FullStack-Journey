import { validationResult } from "express-validator";
import { BadRequestError } from "../utils/errors";

export const validationErrorHandler = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessage = errors.array().map(err=> err.msg);
        throw new BadRequestError(errorMessage.join('. '))
    }

    next();
}