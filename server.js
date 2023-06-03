var express = require("express");
var app = express();
const path = require("path"); 
const fs = require("fs");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(express.json());
const fileUpload = require("express-fileupload");
// app.use("/socket.io", express.static(__dirname + "/node_modules/socket.io/client-dist"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization,WWW-Authenticate,multipart/form-data"
  );

  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});


const port = process.env.PORT || 2411;

http.listen(port, () => console.log(`Node app listening on port ${port}!`));

const {contactList,messagesList}=require("./data")

app.use(express.static("public"));

// Routes
app.get("/contacts", function (req, res) {
  res.send(contactList);
});

app.post("/message", function (req, res) {
  const body = req.body;
  messagesList.push(body);
  io.emit("newMessage", body); // Emit event to all connected clients
  res.send(body);
});

app.get("/messages", function (req, res) {
  res.send(messagesList);
});

io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("message", (data) => {
      console.log("Received message:", data);
      io.emit("newMessage", data);
    });
  
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

//   app.post("/upload", function (req, res) {
//     const file = req.files.file;
//     const fileName = file.name;
//     const filePath = path.join(__dirname, "uploads", fileName);
//     file.mv(filePath, function (err) {
//       if (err) {
//         console.error(err);
//         return res.status(500).send(err);
//       }
//       const fileUrl = `http://your-domain.com/uploads/${fileName}`; 
//       io.emit("newFile", fileUrl);
  
//       res.json({ success: true, fileUrl: fileUrl });
//     });
//   });


// app.post("/upload", function (req, res) {
//     const files = req.files;
//     console.log(files);
//     const fileUrls = [];
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const fileName = file.name;
//       const filePath = path.join(__dirname, "uploads", fileName);
//       file.mv(filePath, function (err) {
//         if (err) {
//           console.error(err);
//           return res.status(500).send(err);
//         }
//         const fileUrl = `http://your-domain.com/uploads/${fileName}`; 
//         fileUrls.push(fileUrl);
//         io.emit("newFile", fileUrl);
//         if (fileUrls.length === files.length) {
//           res.json({ success: true, fileUrls: fileUrls });
//         }
//       });
//     }
//   });



  app.post("/upload", function (req, res) {
    let body=req.body;
    console.log(body);
    const files = req.files;
    console.log(files);
    const fileUrls = [];
    let uploadCount = 0; 
    if (!files || Object.keys(files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = file.name;
      const filePath = path.join(__dirname, "uploads", fileName);
  
      file.mv(filePath, function (err) {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
  
        const fileUrl = `http://your-domain.com/uploads/${fileName}`;
        fileUrls.push(fileUrl);
        io.emit("newFile", fileUrl);
        uploadCount++;

        console.log(fileUrls);
  
        if (uploadCount === files.length) {
          res.json({ success: true, fileUrls: fileUrls });
        }
      });
    }
  });
  