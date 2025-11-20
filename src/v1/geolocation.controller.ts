import CONFIGURATION from "../common/config";
import axios from "axios";
import { Request, Response, NextFunction } from "express";
import https from "node:https";

// interface GeoCoordinates {
//   latitude: number;
//   longitude: number;
// }

class LocationService {
    constructor() { }

    public async getLocation(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const cache: any = req.query;
            const now: any = Date.now();
            let data = {};

            const cacheTimestamp: any = new Date(Number(cache.timestamp))


            if (cacheTimestamp && now - cacheTimestamp < 10 * 60 * 1000) {
                if (cache.latitude !== undefined && cache.longitude !== undefined) {
                    data = await this.axiosCall(Number(cache.latitude), Number(cache.longitude));
                }
                else {
                    return res.status(400).json({
                        status: 400,
                        message: "No valid cached location. Frontend must send lat/long."
                    })

                }
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "No valid cached location. Frontend must send lat/long."
                })

            }

            const jsonResponse = {
                status: 200,
                message: "success",
                data: data
            }
            return res.status(200).json(jsonResponse);
        }
        catch (error: any) {
            next(error);
        }
    }

    public async axiosCall(lat: any, long: any): Promise<any> {
        try {
            const body: any = {
                "input": "restaurant",
                "locationBias": {
                    "circle": {
                        "center": {
                            "latitude": lat,
                            "longitude": long
                        },
                        "radius": 500.0
                    }
                }
            }

            const url: any = CONFIGURATION.GOOGLE_MAPS_API.url

            console.log('url', url)
            const axiosResponse = await axios.post(url, body,
                {

                    headers: { "Content-Type": "application/json", "X-Goog-Api-Key": CONFIGURATION.GOOGLE_MAPS_API.key },
                    httpsAgent: new https.Agent({ rejectUnauthorized: false })

                });
            return Promise.resolve(axiosResponse.data);
        } catch (error: any) {
            return Promise.reject(error);
        }

    }


}

export default LocationService;
