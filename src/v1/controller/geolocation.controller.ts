import CONFIGURATION from "../../common/config";
import axios from "axios";
import { Request, Response, NextFunction } from "express";
import https from "node:https";
import fs from 'fs';
import path from 'path';
import DbConnection from "../../common/db-connection";
import AxiosProxyConnector from "../../common/proxy-calls";

class LocationService {
  private readonly dbConnection: DbConnection;
  private readonly axiosConnector: AxiosProxyConnector

  constructor() {
    this.dbConnection= new DbConnection();
    this.axiosConnector = new AxiosProxyConnector();
  }

  public async getLocation(req: Request, res: Response, next: NextFunction): Promise<any> {
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
          apiResponse = await this.axiosConnector.placesNearbyProxy(lat, long);
        } else {
          return res.status(400).json({
            status: 400,
            message: "No valid cached location. Frontend must send lat/long.",
          });
        }
      }


      const restu = await Promise.allSettled(apiResponse.map(async (ele: any) => {

        let x: any = await this.axiosConnector.placeDetailsPhotoProxy(ele.photos[0].name);
        const imagesDir = path.join(process.cwd(), "images");

         if (!fs.existsSync(imagesDir)) { fs.mkdirSync(imagesDir); }
           
        const safeName = ele?.displayName?.text.replace(/[^A-Z0-9]+/ig, "_");
        fs.writeFileSync( path.join(imagesDir, `${safeName}.png`), x);

         const pool = await this.dbConnection.connectDB();
         await pool.query('INSERT INTO crowd_analytics(place_id) VALUES ($1) ON CONFLICT (place_id) DO NOTHING;', [`${ele?.id}`])
        
        return {
          id: ele?.id,
          name: ele?.displayName?.text,
          photo: `/images/${safeName}.png`,
          rating: ele?.rating,
          google_maps_url: ele?.googleMapsUri,
          website_url: ele?.websiteUri
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

}

export default LocationService;
