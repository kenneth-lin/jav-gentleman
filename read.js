var fs = require('fs')
const path = require('path')
var config = require('./package.json')
let publicFolder = config.publicFolder

exports.readFolder = function (pathQ, callback) {
    var data = {}
    data.folders = []
    data.images = []
    data.videos = []
    //var dir = __dirname + pathQ
    var dir = publicFolder + pathQ
    //var imageBasedir = __dirname + '/'+publicFolder
    var imageBasedir = publicFolder
    fs.readdir(dir, function (err, files) {
        if (err) {
            callback("Nothing",data)
            return
        }
        files.forEach((filename, index) => {
            let pathname = path.join(dir, filename)
            let stats = fs.statSync(pathname)
            if (stats.isDirectory()) {
                var filePath = pathname.substring(imageBasedir.length, pathname.length)
                filePath = filePath.replace(/\\/g, '\/')
                data.folders.push(filePath)
            } else if (stats.isFile()) {
                if (['.jpg', '.jpeg', '.gif', '.png'].includes(path.extname(pathname))) {
                    var filePath = pathname.substring(imageBasedir.length, pathname.length)
                    filePath = filePath.replace(/\\/g, '\/')                    
                    data.images.push(filePath)
                }
                if (['.mp4'].includes(path.extname(pathname))) {
                    var filePath = pathname.substring(imageBasedir.length, pathname.length)
                    filePath = filePath.replace(/\\/g, '\/')
                    data.videos.push(filePath)
                }
            }
        })
        callback(null, data);
    })
}
