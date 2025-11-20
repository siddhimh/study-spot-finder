import App from './src/main.js';

try{
   const app = new App();
   app.run();
}
catch(e: any){
   process.exit(1);
}