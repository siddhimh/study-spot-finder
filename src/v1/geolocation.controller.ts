import CONFIGURATION from "../config";
import axios from "axios";

interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

class LocationService {
  constructor() {}

  public async getLocation(): Promise<GeoCoordinates> {
    const cache = JSON.parse(localStorage.getItem("cachedLocation") || "{}");
    const now = Date.now();

    if (cache.timestamp && now - cache.timestamp < 10 * 60 * 1000) {
      if (cache.latitude !== undefined && cache.longitude !== undefined) {
        useLocation(cache.latitude, cache.longitude);
      } else {
        console.warn("Cached location exists but lat/lng missing.");
      }
    } else {
      console.log("Cache expired or not available, fetch new location.");
    }
  }

  public async axiosCall(): Promise<any> {
    const params = {
      location: "37.7749,-122.4194",
      radius: 1000,
      type: "restaurant",
      key: CONFIGURATION.GOOGLE_MAPS_API.key,
    };
  }
}

export default LocationService;
