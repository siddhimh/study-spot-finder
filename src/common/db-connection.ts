import {Pool} from 'pg';

class DbConnection{

    private pool!: Pool
     
    public async connectDB(): Promise<any> {
if(!this.pool){
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
return Promise.resolve(this.pool);
    

  }


}


export default DbConnection;