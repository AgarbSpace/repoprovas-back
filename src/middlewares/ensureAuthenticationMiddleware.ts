import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userService from "../services/userService.js";

dotenv.config();

export async function ensureAuthenticationMiddleware(request: Request, response: Response, next: NextFunction){
    const authorization = request.headers['authorization'];
    if(!authorization){
        throw{
            type: "Unauthorized",
            message: "Invalid credentials"
        }
    }

    const token = authorization.replace("Bearer ", '');
    const payload = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
    const user = await userService.findUserById(payload.userId);
    response.locals.user = user, 

    next();

}