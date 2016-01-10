// config/express.js
/*
"use strict";

exports.express = {
    customMiddleware: function (app) {
        app.use(function hsts(req, res, next) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            next();
        });
    }
}


app.get('/*',function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    next(); // http://expressjs.com/guide.html#passing-route control
});


app.post('/*',function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    next(); // http://expressjs.com/guide.html#passing-route control
});
*/