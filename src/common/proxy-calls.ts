import axios from "axios";
import CONFIGURATION from "./config";
import https from "node:https";

class AxiosProxyConnector {

    public async placesNearbyProxy(lat: any, long: any): Promise<any> {
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
                    "X-Goog-FieldMask": "places.displayName,places.location,places.photos,places.rating,places.id,places.websiteUri,places.googleMapsUri"
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            });
            return Promise.resolve(axiosResponse.data.places);
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    public async placeDetailsPhotoProxy(photoRef: any): Promise<any> {
        try {


            const url: any = `${CONFIGURATION.GOOGLE_MAPS_API.photos_url}/${photoRef}/media`;
            const axiosResponse = await axios.get(url, {
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
        catch (error: any) {
            return Promise.reject(error)
        }
    }


    public async placeDetailsProxy(placeId: any): Promise<any> {
        try {
            const url: any = `${CONFIGURATION.GOOGLE_MAPS_API.details_url}/${placeId}`;
            const axiosResponse = await axios.get(url, {
                params: {
                 "Content-Type": "application/json",
                    "X-Goog-Api-Key": CONFIGURATION.GOOGLE_MAPS_API.key,
                    "X-Goog-FieldMask": "id,displayName,rating,userRatingCount,reviewSummary,reviews"
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            });
            return Promise.resolve(axiosResponse);
        }
        catch (error: any) {
            return Promise.reject(error)
        }
    }


}

export default AxiosProxyConnector;