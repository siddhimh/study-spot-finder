import express, { Response, Request } from 'express';
import LocationService from './geolocation.controller';

const appRouter = express.Router();

appRouter.get('/find', LocationService.);

export default appRouter;