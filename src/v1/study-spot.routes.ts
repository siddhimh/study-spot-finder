import express, { Response, Request } from 'express';

import LocationService from './geolocation.controller';
import { proxy } from '../common/app.utility';


const locationServiceController = proxy(new LocationService());
const appRouter = express.Router();

appRouter.get('/healthcheck', (req: Request, res: Response) => {
    res.status(200).send(
        {
            status: 200,
            message: "success"
        })
})

appRouter.get('/find', locationServiceController.getLocation);

export default appRouter;