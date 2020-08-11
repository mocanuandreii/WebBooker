var express = require('express');
var path = require('path');
var app = express();
var rootPath = path.normalize(__dirname + '/../');
var bodyParser = require('body-parser');
var http = require('http').createServer(app);

var serverAddress = 'https://notify.insoftd.com:9910';
var companyID = 248

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static( rootPath + '/app'));

const db = require('/app/config/db.config.js');

require('../app/controller/company.route.js')(app);
require('../app/controller/user.route.js')(app);
require('../app/controller/account.route.js')(app);
require('../app/controller/driverStatus.route.js')(app);
require('../app/controller/voucher.route.js')(app);
require('../app/controller/cartype.route.js')(app);
require('../app/controller/price.route.js')(app);
require('../app/controller/booking.route.js')(app);

// Create a Server
var server = app.listen(8000, function () {

    var host = 'localhost';
    var port = '8000';

    console.log("App listening at http://%s:%s", host, port);
})
