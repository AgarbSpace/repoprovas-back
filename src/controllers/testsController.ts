import { Request, Response } from "express";
import testsService from "../services/testsService.js";

export async function getTests(request: Request, response: Response){

    const {by} = request.query

    if(by){
        const tests = await testsService.testsBy(by)
        return response.send(tests).status(201);
    }

    const tests = await testsService.tests()

    response.send(tests).status(201);
}