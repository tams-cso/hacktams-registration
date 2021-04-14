/**
 * Route: /api/auth
 */

import express from 'express';
import { v4 } from 'uuid';
import { sendError } from '../functions/util';
import Client from '../models/Client';

const router = express.Router();

router.get('/', async function (req, res) {
    if (req.query.oauth !== undefined) {
        switch (req.query.oauth) {
            case 'google':
                // Send google oauth url
                return;
            case 'linkedin':
                // Send linkedin oauth url
                return;
            default:
                sendError(res, 400, 'Invalid oauth service');
                return;
        }
    }
    // Send all of the oauth urls
});

router.get('/client', async function (req, res) {
    // Create the client ID
    const id: string = v4();
    const newClient = new Client({ id });
    
    // Save the ID in the database
    // TODO: Create an expiry time or refresh exchange with client occasionally
    newClient.save();

    // Return the ID to the client
    res.send({ id });
});

export default router;
