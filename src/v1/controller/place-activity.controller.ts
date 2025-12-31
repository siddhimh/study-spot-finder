import { NextFunction } from "express";
import Scheduler from "../../common/scheduler";

class PlaceActivity{
    private readonly scheduler: Scheduler;

    constructor(){
        this.scheduler= new Scheduler();
    }


    public async save(req: Request, res: Response, next: NextFunction): Promise<void>{
       try{

       }
       catch(error: any){
           next(error);
       }
    }

}

export default PlaceActivity;