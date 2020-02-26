var express = require('express')
var ejs = require('ejs')
var readfile = require('./read')
var config = require('./package.json')

var app = express()

app.set('views', __dirname + '/view');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

let publicFolder = config.publicFolder
let port = config.port
for(var i in publicFolder){
    app.use(express.static(publicFolder[i]))
}
app.use(express.static('images'));

app.get('/', function (req, res) {
    var pathQ = req.query["path"]
    var index = req.query["index"]
    //if (!pathQ) pathQ = '/'+publicFolder
    if(!index){
        res.render('index', { data: publicFolder });
        return;
    }
    if (!pathQ) pathQ = '/'
    pathQ = pathQ.replace(/\\/g, '\/')
    readfile.readFolder(pathQ,index,function(error,data){
        let pathBack = pathQ.substring(0,pathQ.lastIndexOf('/'))
        data.pathBack = pathBack
        data.pathQ = pathQ
        data.index = index
        if(error){
            res.render('error', { title: pathQ, data: data });
            return
        }
        res.render('main', { title: pathQ, data: data });
    })
    
})


app.listen(port)