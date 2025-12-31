import { Request, Response, NextFunction } from "express";
import DbConnection from "../../common/db-connection";

class RealTimeCrowd {
    private readonly dbConnection: DbConnection
    constructor() {
        this.dbConnection = new DbConnection()
    }

    public async getCrowdData(req: Request,
        res: Response,
        next: NextFunction): Promise<any> {
        try {
            console.log("wgattttttttttttttttttt")
            
            // const pool = await this.dbConnection.connectDB();
            // await pool.query('INSERT INTO crowd_analytics(day, hour) VALUES ($1, $2)', ["Wednesday", 11])

            // const result = await pool.query('SELECT * FROM crowd_analytics')
            // console.log(result.rows)

        }
    catch(error: any) {
        next(error);
    }
}
}

export default RealTimeCrowd;