var express = require('express');
var app = express();
var http = require('http').Server(app);
var engine = require('ejs-locals');
var bodyParser = require('body-parser');
var io = require('socket.io')(http);

let message = [
    ["@13456789876","現實世界中的行為與物件正不斷轉換成為大量的「資訊」， 當人們試圖尋找能證明「資訊」存在的方法時，也開始嘗試 以科學方法計算出「資訊重量」。"],
    ["@43804943949","現實世界中的行為與物件正不斷轉換成為大量的「資訊」， 當人們試圖尋找能證明「資訊」存在的方法時，也開始嘗試 以科學方法計算出「資訊重量」。"],
    ["@34234340545","現實世界中的行為與物件正不斷轉換成為大量的「資訊」， 當人們試圖尋找能證明「資訊」存在的方法時，也開始嘗試 以科學方法計算出「資訊重量」。"],
];


app.engine('ejs', engine);
app.set('views', "./views");
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.static('node_modules/bootstrap/dist/css'));
app.use(express.static('node_modules/bootstrap/dist/js'));
app.use(express.static('node_modules/jquery/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: false }));



//使用者
app.get('/', function (req, res) {
    res.render('User');
});


var userId = 0;
io.on('connection', function (socket) {
    socket.userId = userId++;
    console.log('a user connected, user id: ' + socket.userId);

    socket.on('message', function (msg) {
        socket.emit('message', message[Math.floor(Math.random() * 3)]);
    });
    
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});