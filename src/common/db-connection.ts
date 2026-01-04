import { Pool } from 'pg';

class DbConnection {

    private pool!: Pool


    public async connectDB(): Promise<any> {
        if (!this.pool) {
            this.pool = new Pool({
                user: 'postgres',
                password: 'Stan2@ford',
                host: 'localhost',
                port: 5432,
                database: 'cafe-finder',
            })

            try {

                await this.pool.query('SELECT 1');
                console.log("Postgres Connection established!!!");
            } catch (err) {
                console.error(err);
            }
        }
        // return Promise.resolve(this.pool);
        return this.pool;
    }


}


export default DbConnection;


// class DbConnection {
//   private static instance: DbConnection;
//   private pool!: Pool;

//   private constructor() {}

//   public static getInstance(): DbConnection {
//     if (!DbConnection.instance) {
//       DbConnection.instance = new DbConnection();
//     }
//     return DbConnection.instance;
//   }

//   public async connectDB(): Promise<Pool> {
//     if (!this.pool) {
//       this.pool = new Pool({...});
//       await this.pool.query("SELECT 1");
//     }
//     return this.pool;
//   }
// }
