var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var Typed = require('typed.js');

var http = require('http').Server(app);


// var https = require('https').Server(
//     {
//         key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//         cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
//     },
//     app
// );

var engine = require('ejs-locals');
var bodyParser = require('body-parser');
var io = require('socket.io')(http);


let userData = require("./data.json");
let data = JSON.parse(JSON.stringify(userData));
let data_index = 409;

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.static('node_modules/bootstrap/dist/css'));
app.use(express.static('node_modules/bootstrap/dist/js'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/typed.js/dist'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: false }));


app.set('views', "./views");


app.get('/demo', function (req, res) {
    res.render('demo');
});

app.get('/', function (req, res) {
    res.render('main');
});

app.get('/screen', function (req, res) {
    res.render('screen');
});



io.on('connection', function (socket) {

    var clientIp = socket.request.connection.remoteAddress;
    console.log('user ip: ' + clientIp);

    socket.on('web_message', function (MSG) {

        if (data_index < data.length - 1) data_index++;
        else data_index = 0;

        console.log(data.length.toString() + " : " + data_index.toString());
        let message = [data[data_index].Date, data[data_index].Msg, data[data_index].K1, data[data_index].K2, data[data_index].K3, data[data_index].K4];

        console.log('user ip: ' + clientIp);
        socket.emit('web_message', message);
        io.emit('esp_message', clientIp);
        io.emit('esp_weight', 60);

    });

    socket.on('esp_break', function (MSG) {
        io.emit('esp_break', clientIp);
    });
});



let PORT = 3000;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));