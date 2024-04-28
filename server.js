var express = require('express');
var app = express();
var http = require('http').Server(app);
var engine = require('ejs-locals');
var bodyParser = require('body-parser');
var io = require('socket.io')(http);

let userData = require("./data.json");
let data = JSON.parse(JSON.stringify(userData));


app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.static('node_modules/bootstrap/dist/css'));
app.use(express.static('node_modules/bootstrap/dist/js'));
app.use(express.static('node_modules/jquery/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: false }));


app.set('views', "./views");
app.get('/demo', function (req, res) {
    res.render('demo');
});

app.get('/', function (req, res) {
    res.render('main');
});



io.on('connection', function (socket) {

    var clientIp = socket.request.connection.remoteAddress;
    console.log('user ip: ' + clientIp);

    socket.on('web_message', function (MSG) {

        let randomValue = Math.floor(Math.random() * data.length);
        let message = [data[randomValue].Date, data[randomValue].Msg, data[randomValue].K1, data[randomValue].K2, data[randomValue].K3, data[randomValue].K4];


        console.log('user ip: ' + clientIp);
        socket.emit('web_message', message);
        io.emit('esp_message',clientIp);
    });

});


http.listen(3000, function () {
    console.log('listening on *:3000');
});