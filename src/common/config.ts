import dotenv from "dotenv";
dotenv.config();

const CONFIGURATION = {
  APP_CONFIG: {
    enviroment: "local",
    name: "study-spot-finder",
    port: 3000,
  },
  GOOGLE_MAPS_API: {
    key: process.env.GOOGLE_MAPS_KEY,
    url: process.env.GOOGLE_MAPS_URL
  },
  PROXY_SERVER: {
    userProxy: true,
    proxy: process.env.HEROKU_URL,
  },
};

export default CONFIGURATION;
