import CONFIGURATION from "../../common/config";
import axios from "axios";
import { Request, Response, NextFunction } from "express";
import https from "node:https";
import fs from 'fs';
import path from 'path';

// interface GeoCoordinates {
//   latitude: number;
//   longitude: number;
// }

class LocationService {
  constructor() {}

  public async getLocation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const cache: any = req.query;
      let dataResponse: any = {
        places: [],
      };

      let apiResponse = [];

      if (cache.latitude == "" || cache.longitude == "") {
        return res.status(400).json({
          status: 400,
          message: "Latitude and Longitude are required",
        });
      }
      const long: any = Number(cache.longitude);
      const lat: any = Number(cache.latitude);

      if (![long, lat].every(isFinite)) {
        return res.status(400).json({
          status: 400,
          message: "Latitude and Longitude are required",
        });
      }

      if (cache.timestamp) {
        const timeNow: any = Date.now();
        const clientTimestamp: any = new Date(Number(cache.timestamp));

        if (clientTimestamp && timeNow - clientTimestamp < 10 * 60 * 1000) {
          apiResponse = await this.axiosCall(lat, long);
        } else {
          return res.status(400).json({
            status: 400,
            message: "No valid cached location. Frontend must send lat/long.",
          });
        }
      }


      const restu = await Promise.allSettled(apiResponse.map(async (ele: any) => {

        let x: any = await this.axioscall2(ele.photos[0].name);
        const imagesDir = path.join(process.cwd(), "images");

         if (!fs.existsSync(imagesDir)) { fs.mkdirSync(imagesDir); }
           
        const safeName = ele?.displayName?.text.replace(/[^A-Z0-9]+/ig, "_");
        fs.writeFileSync( path.join(imagesDir, `${safeName}.png`), x);
        
        return {
          name: ele?.displayName?.text,
          photo: `/images/${safeName}.png`,
          rating: ele?.rating,
          // price: ele?.priceLevel
        };
      }));

    dataResponse.places=  restu.filter(r => r.status== "fulfilled").map(r => r.value)


      const jsonResponse = {
        status: 200,
        message: "success",
        data: dataResponse,
      };
      return res.status(200).json(jsonResponse);
    } catch (error: any) {
      next(error);
    }
  }

  public async axiosCall(lat: any, long: any): Promise<any> {
    try {
      const body: any = {
        includedTypes: ["cafe"],
        locationRestriction: {
          circle: {
            center: {
              latitude: lat,
              longitude: long,
            },
            radius: 500.0,
          },
        },
      };

      const url: any = CONFIGURATION.GOOGLE_MAPS_API.url;
      const axiosResponse = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": CONFIGURATION.GOOGLE_MAPS_API.key,
          "X-Goog-FieldMask": "places.displayName,places.photos,places.rating,places.priceLevel"
       },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });
      return Promise.resolve(axiosResponse.data.places);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }


  public async axioscall2(photoRef: any): Promise<any>{
try{


      const url: any = `${CONFIGURATION.GOOGLE_MAPS_API.photos_url}/${photoRef}/media`;
      const axiosResponse = await axios.get(url,  {
        params: {
          key: CONFIGURATION.GOOGLE_MAPS_API.key,
          max_height_px: 1024
       },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        responseType: 'arraybuffer'
      });
      const imageBuffer = Buffer.from(axiosResponse.data)
      return Promise.resolve(imageBuffer);
}
catch(error: any){
   return Promise.reject(error)
}
  }
}

export default LocationService;
