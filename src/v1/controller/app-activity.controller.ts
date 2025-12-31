import { NextFunction } from "express";
import Scheduler from "../../common/scheduler";

class AppActivity{
    private readonly scheduler: Scheduler;

    constructor(){
        this.scheduler= new Scheduler();
    }


    public async save(req: Request, res: Response, next: NextFunction): Promise<void>{
       try{
         console.log("yooooooooooo")
       }
       catch(error: any){
           next(error);
       }
    }

}

export default AppActivity;