import { Request, Response, NextFunction} from "express"

export default function errorHandlerMiddleware(error, request: Request, response: Response, next: NextFunction){

    if(error.type === "Conflict"){
        console.log(error.message)
        const message = error.message;
        return response.status(409).send(message);
    }

    if(error.type === "Not_Found"){
        console.log(error.message)
        return response.sendStatus(404);
    }

    if(error.type === "Unprocessable_Entity"){
        console.log(error.message);
        return response.sendStatus(422);
    }

    if(error.type === "Unauthorized"){
        console.log(error.message);
        return response.sendStatus(401)
    }

    console.log(error);
    return response.sendStatus(500);
}