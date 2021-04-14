/**
 * Route: /api
 */

import express from 'express';
import authRouter from './auth';
import { sendError } from '../functions/util';
import Client from '../models/Client';

const router = express.Router();

// Run this function for all api routes!
router.use(async function (req, res, next) {
    // Ignore checks for /auth/client route
    if (req.originalUrl === '/api/auth/client') {
        next();
        return;
    }

    // Check to see if client ID header exists
    if (req.headers['client-id'] === undefined) {
        sendError(res, 401, 'No client-id header in request');
        return;
    }

    // Check to see if it is a valid client ID header
    const data = await Client.findOne({ id: req.headers['client-id'] }).exec();
    if (data === null) {
        sendError(res, 401, 'Invalid client-id');
        return;
    }

    // Continue to the API route
    next();
});

// Home route for the API
router.get('/', async function (req, res) {
    res.send({
        description: `This is the API :) If you're not a developer, then you probably shouldn't be here hehe. Links to cool sites are below!`,
        links: ['https://2021.hacktams.org/', 'https://hacktams.org/', 'https://cso.tams.club/'],
    });
});

// Use sub routers for api paths
router.use('/auth', authRouter);

export default router;
