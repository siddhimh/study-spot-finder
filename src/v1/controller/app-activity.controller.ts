import { Request, Response, NextFunction } from "express";
import Scheduler from "../../common/scheduler";
import DbConnection from "../../common/db-connection";

class AppActivity{
    private readonly dbConnection: DbConnection

    constructor(){
        this.dbConnection= new DbConnection();
    }


    public async save(req: Request, res: Response, next: NextFunction): Promise<any>{
       try{

        const {place_id, action}: any = req.body

        if(!place_id|| !action){
            return res.status(400).json({status: 400, message: "Invalid data"});      
        }

         const pool = await this.dbConnection.connectDB();
         await pool.query('INSERT INTO app_activity(place_id, action) VALUES ($1, $2)', [place_id, action]);

        return res.status(200).json({status: 200, message: "Data inserted"});
       }
       catch(error: any){
           next(error);
       }
    }

}

export default AppActivity;