import cron from 'node-cron';
import DbConnection from './db-connection';
import AxiosProxyConnector from './proxy-calls';

class Scheduler{
    private readonly dbConnection: DbConnection;
    private readonly axiosConnector: AxiosProxyConnector

    constructor(){
        this.dbConnection= new DbConnection();
        this.axiosConnector = new AxiosProxyConnector();
    }

    public async placeActivity(): Promise<void>{

        //Reviews
        cron.schedule('15 05 * * *', async () => {
        console.log('hiiiiiiiii')
        const pool: any= this.dbConnection.connectDB();
        const result: any = await pool.query('SELECT place_id from crowd_analytics');
        console.log('resultttt', result);
        // const proxy= this.axiosConnector.placeDetailsProxy();
        

        // await pool.query('INSERT INTO crowd_analytics(day, hour) VALUES ($1, $2)', ["Wednesday", 11]);
        console.log('running a task every minute');
        });


    //      cron.schedule('* 30 14 * *', async () => {
    //     const pool: any = this.dbConnection.connectDB();
    //     await pool.query('INSERT INTO crowd_analytics(day, hour) VALUES ($1, $2)', ["Wednesday", 11]);
    //     console.log('running a task every minute');
    //     });

    //      cron.schedule('* 30 14 * *', async () => {
    //     const pool: any = this.dbConnection.connectDB();
    //     await pool.query('INSERT INTO crowd_analytics(day, hour) VALUES ($1, $2)', ["Wednesday", 11]);
    //     console.log('running a task every minute');
    //     });
    }
}

export default Scheduler;

