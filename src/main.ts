import express, { Application } from "express";
import CONFIGURATION from "./common/config";
import cors from 'cors';
import appRouter from "./v1/routes/study-spot.routes";
import path from "path";

class App {
  private app: Application;

  constructor() {
    this.app = express();
  }

  public async run(): Promise<void> {

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use('/place', appRouter);

    this.app.use(express.static(path.join(__dirname, '../../public')));
    this.app.use("/images", express.static(path.join(process.cwd(), "images"))
);

    this.app.get('/{*any}', (req, res) => {
      res.sendFile(path.join(__dirname, '../../public/index.html'));
    });

    this.app.listen(CONFIGURATION.APP_CONFIG.port, () => {
      console.log(
        `Application is running at ${CONFIGURATION.APP_CONFIG.port
        } with ${CONFIGURATION.APP_CONFIG.enviroment.toUpperCase()} configuration`
      );
    });
  }
}

export default App;


//rate limitter to add
//redis caching
//joi validation
//middleware