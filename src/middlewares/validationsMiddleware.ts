import { Request, Response, NextFunction } from "express";



export async function validateSchema(schema){
    return (request: Request, response: Response, next: NextFunction) => {
        const validation = schema.validate(request.body);
        if (validation.error) {
            const error = validation.error.details.map(error => error.message)
            return response.status(422).send(error);
        }
    
        next();
    }
}