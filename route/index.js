'use strict';

import fs from 'fs';
import settings from '../config/settings';


function walkSync(dir, filelist) {

  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir+'/' + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    }
    else {
      filelist.push(dir+"/"+file);
    }
  });
  return filelist;
};

function appliRoute(routes){
  let methods = [];
  for(let i in routes){
    const Methods = require('.'+routes[i])
    methods.push(Methods);
  }
  return methods;
}

const rawRoutes = walkSync(settings.routePath);

const routes = rawRoutes.map(route =>{
  return route.substring(settings.routePath.length-1,route.length-3).replace("//","/");
}).filter(route => {
  const testA = route !== "/index";
  const testB = route.indexOf('.') === -1;
  console.log(route,testA,testB)
  return  testA && testB;
}).map(route=> {
  return (route.indexOf('index') !== -1 ? route.substring(0,route.lastIndexOf('/')+1) : route);
});

const methods  = appliRoute(routes);

export {
    routes,
    methods
}