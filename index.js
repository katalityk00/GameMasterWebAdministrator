'use strict';


import Express from "express";
import bodyParser from 'body-parser'; 
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {routes,methods} from './route';
import settings from './config/settings';

console.log('hello world');

console.log(routes);
console.log(methods);

function binding(routes,methods,api){
    for(let i in routes){
        const verbe = Object.keys(methods[i]);
        for(let j in verbe){
            if(routes[i]==="/home/"){
                api[verbe[j]]('/',methods[i][verbe[j]]);
            }else{
                api[verbe[j]](routes[i],methods[i][verbe[j]]);
            }
            
        }
    }
}

const api = Express();
api.set('view engine','ejs');
api.use(Express.static(__dirname+"/views/public"));
api.use(bodyParser.json({limit: '500gb'}));
api.use(bodyParser.urlencoded({limit: '500gb', extended: false }));
api.use(cors({credentials: true, origin: true}));

api.use(cookieParser());

binding(routes,methods,api);

api.listen(settings.port, () => { 
    console.log("the api is running on the port number :");
    console.log(settings.port);
});