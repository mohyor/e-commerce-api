const app = require('../../app');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json({ limit: "100mb" }));

// Upload File Base64
/*
app.post('/upload', (req, res) => {
 let filePath = `./products/${Date.now()}_${req.body.name.replace(new RegExp(' ','g'),'_')}`;
 //let fila = './products/'
 let buffer = Buffer.from(req.body.base64.split(',')[1], "base64");

 fs.writeFileSync(path.join(__dirname, filePath), buffer);

 res.json(filePath);
});
*/

const fs = require('fs');
const path = require('path');
const mime = require('mime');

//app.use(express.static(__dirname, './helpers'));
//app.set("views",path.join(__dirname,"./helpers/views"))

const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, "./products")
 },
 filename: function (req, file, cb) {
  cb(null, file.fieldname + "-" + Date.now()+".jpg")
 }
})

//const maxSize = 1 * 1000 * 1000; // MaxSize: 1mb
//let file; //const files = ("files", number)

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
 
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  if (mimetype && extname) {
    return cb(null, true);
  }
 
  cb("Error: File upload only supports the " + "following filetypes - " + filetypes);
}
 

const upload = multer({ 
 storage: storage,
 //limits: { fileSize: maxSize },
 fileFilter: fileFilter,
}).any();       

/*
const upload = multer({ 
  storage: storage,
  //limits: { fileSize: maxSize },
  fileFilter: fileFilter,
});

app.post("/upload",function (req, res, next) {
 upload(req,res,function(err) {
  if(err) {
   console.log(err);
  } else { res.send("Success, Image uploaded!")}
 })
})
*/

app.post("/upload", upload);

server.listen(port, () => console.log(`Server Running on port: ${port}`));