import express, { Response, Request } from 'express';

import LocationService from '../controller/geolocation.controller';
import AppActivity from '../controller/app-activity.controller';
import RealTimeCrowd from '../controller/crowd.controller';
import { proxy } from '../../common/app.utility';


const locationServiceController = proxy(new LocationService());
const realTimeCrowdController= proxy(new RealTimeCrowd());
const appActivity = proxy(new AppActivity());
const appRouter = express.Router();

appRouter.get('/healthcheck', (req: Request, res: Response) => {
    res.status(200).send(
        {
            status: 200,
            message: "success"
        })
})

appRouter.get('/find', locationServiceController.getLocation);
appRouter.post('/crowd', realTimeCrowdController.getCrowdData)
appRouter.post('/click', appActivity.save)

export default appRouter;