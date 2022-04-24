import { Request, Response } from "express";
import userService, { CreateUserData } from "../services/userService.js";

export async function signUp(request: Request, response: Response){
    const userData: CreateUserData = request.body;

    await userService.createUser(userData);

    response.sendStatus(201);
}

export async function signIn(request: Request, response: Response){
    const userData: CreateUserData = request.body;

    const token = await userService.getToken(userData);

    response.send(token).status(201);
}

