import express, { Application } from "express";
import CONFIGURATION from "./config";
import cors from 'cors';
import appRouter from "./v1/study-spot.routes";

class App {
  private app: Application;

  constructor() {
    this.app = express();
  }

  public async run(): Promise<void> {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json);
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(appRouter)
    this.app.listen(() => {
      console.log(
        `Application is running at ${
          CONFIGURATION.APP_CONFIG.port
        } with ${CONFIGURATION.APP_CONFIG.enviroment.toUpperCase()} configuration`
      );
    });
  }
}

export default App;
