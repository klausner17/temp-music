import { Response } from "express";

export function sendError(error: any, errorMessage: string, statusCode: number, res: Response) {
    res.status(statusCode).json({msg: errorMessage});
    console.log(JSON.stringify(error));
}