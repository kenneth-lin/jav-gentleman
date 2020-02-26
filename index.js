var express = require('express')
var ejs = require('ejs')
var readfile = require('./read')

var app = express()

app.set('views', __dirname + '/view');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(express.static('image'));
app.use(express.static('images'));

app.get('/', function (req, res) {
    var pathQ = req.query["path"]
    if (!pathQ) pathQ = '/image'
    pathQ = pathQ.replace(/\\/g, '\/')
    readfile.readFolder(pathQ,function(error,data){
        let pathBack = pathQ.substring(0,pathQ.lastIndexOf('/'))
        data.pathBack = pathBack
        data.pathQ = pathQ
        if(error){
            res.render('error', { title: pathQ, data: data });
            return
        }
        res.render('main', { title: pathQ, data: data });
    })
    
})


app.listen(3000)