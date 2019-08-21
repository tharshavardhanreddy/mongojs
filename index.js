var express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');
var mongoose = require('mongoose');
const path=require('path');
const crypto= require('crypto');
const multer= require('multer');
const GridFsStorage= require('multer-gridfs-storage');
const grid= require('gridfs-stream');
const multipart = require('connect-multiparty');
const methodOverride= require('method-override');
var app = express();
//MiddleWare
app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({
    extended: true
}));
const multipartMiddleware = multipart({
    uploadDir: './uploads'
});


 mongoose.connect("mongodb://localhost:27017/sgs");
 const conn= mongoose.connection;
mongoose.connection.on('connected', ()=>{
 console.log('connection established')
})
mongoose.connection.on('error',(err)=>{
    console.log(err);
})


//init gfs
let gfs;
conn.once('open', ()=>{
 gfs=grid(conn.db,mongoose.mongo);
gfs.collection('uploads');})

// create storage engine
const  storage = new GridFsStorage({
    url: 'mongodb://localhost:27017/sgs',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          console.log("storage", file);
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });}
  });
  const upload = multer({ storage });

app.post('/upload',upload.single('file'), (req,res)=>{
    res.json({file:req.file});
})  


app.get('/image/:filename', (req,res)=>{
    gfs.files.findOne({filename:req.params.filename},(err,file)=>{
if(!file || file.length==0){
    return res.status(404).json({
        err:'no file esists'
    });
}
//file exsists
// return res.json(file);
const readstream= gfs.createReadStream(file.filename);
readstream.pipe(res);
    });
})



// const route = require('./router/route');
// app.use('/api', route);
const route=require('./router/route');
app.use('/api', route);

const port = '4500';
app.get('/', (req,res)=>{
res.send("ctfhc");
})



app.listen(port, ()=>{
    console.log("hwefkgweb"+port);
})