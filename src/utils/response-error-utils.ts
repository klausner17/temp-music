import { Response } from "express";
import logger from "../utils/logger"

export function sendError(error: any, errorMessage: string, statusCode: number, res: Response) {
    res.status(statusCode).json({msg: errorMessage});
    logger.error(`[${Date.now()}] - ${JSON.stringify(error)}`);
}