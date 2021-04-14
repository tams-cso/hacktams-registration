import { Response } from "express";
import statusCodes from '../files/statusCodes.json';

/**
 * Send a formatted JSON error object to the user
 * @param res Response object
 * @param status HTTP Status code
 * @param message Error message
 */
export function sendError(res: Response, status: 200 | 400 | 401 | 403 | 500, message: string) {
    res.status(status);
    res.send({
        status,
        statusMessage: `${status}: ${statusCodes[status]}`,
        error: message,
    });
}
