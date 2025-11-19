import express, {Application} from 'express';


class App{
     private app: Application

     constructor(){
        this.app= express();
     }

     public async run(): Promise<void>{
        
     }

}

export default App;