var express = require("express");
var app = express();
const path = require("path"); 
const { PDFDocument } = require('pdf-lib');
const pdf2img = require('pdf2img');
const fs = require("fs");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(express.json());
const multer = require('multer');
const { v4: uuidv4 } = require('uuid')
const upload = multer({ dest: 'uploads/' });
// const fileUpload = require("express-fileupload");
// app.use(fileUpload());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization,WWW-Authenticate"
  );

  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});


const port = process.env.PORT || 2411;

http.listen(port, () => console.log(`Node app listening on port ${port}!`));

const {contactList,messagesList}=require("./data")

app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.get("/contacts", function (req, res) {
  res.send(contactList);
});

app.post("/message", function (req, res) {
  const body = req.body;
//   messagesList.push(body);
  io.emit("newMessage", body); // Emit event to all connected clients
  res.send(body);
});

app.get("/messages", function (req, res) {
  res.send(messagesList);
});
app.post('/upload', upload.array('files'), (req, res) => {
    let body=req.body;
        const fileData = req.files.map((file) => {
          const buffer = fs.readFileSync(file.path);
          const base64 = buffer.toString('base64');
          return {
            originalname: file.originalname,
            buffer: base64,
          };
        });
        console.log(fileData);
      let fileUrl={id:+body.id,senderID:+body.senderID,addedOn:body.addedOn,fileData:fileData,messageType:body.messageType}
    //   messagesList.push(fileUrl);
      io.emit('newFile', fileUrl);
        res.json(fileUrl);
      });

      app.post('/uploadDocument', upload.array('documents'), (req, res) => {
        const body = req.body;
        // console.log(uploadedFile);
        let documents=req.files;
        console.log(documents);
        const documentData = req.files.map((file) => {
          const buffer = fs.readFileSync(file.path);
          const base64 = buffer.toString('base64');
          return {
            originalname: file.originalname,
            buffer: base64,
          };
        });
        console.log(documentData);
        let fileUrl={id:+body.id,senderID:+body.senderID,addedOn:body.addedOn,fileData:documentData,messageType:body.messageType}
      //   messagesList.push(fileUrl);
        io.emit('newFile', fileUrl);
          res.json(fileUrl);
      });

io.on("connection", (socket) => {
    console.log("A user connected");
    // socket.on("message", (data) => {
    //   console.log("Received message:", data);
    //   io.emit("newMessage", data);
    // });
  
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  

  






  
  
  



  