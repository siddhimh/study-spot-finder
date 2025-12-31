import cron from 'node-cron';
import DbConnection from './db-connection';

class Scheduler{
    private readonly dbConnection: DbConnection;

    constructor(){
        this.dbConnection= new DbConnection();

    }

    public async placeActivity(): Promise<void>{
        cron.schedule('* 30 14 * *', async () => {
        const pool: any = this.dbConnection.connectDB();
        await pool.query('INSERT INTO crowd_analytics(day, hour) VALUES ($1, $2)', ["Wednesday", 11]);
        console.log('running a task every minute');
});
    }
}

export default Scheduler;

