var express = require("express");
var app = express();
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = require("socket.io")(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
app.use(express.json());

// app.use("/socket.io", express.static(__dirname + "/node_modules/socket.io/client-dist"));

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

app.listen(port, () => console.log(`Node app listening on port ${port}!`));

const {contactList,messagesList}=require("./data")

// app.get("/contacts",function(req,res){
// res.send(contactList);
// })



// // app.post("/message",function(req,res){
// //     let body=req.body;
// //     messagesList.push(body);
// //     res.send(body);
// // })

// app.get("/message",function(req,res){
//     res.send(messagesList);
// })


// io.on("connection", function (socket) {
//     console.log("A user connected");
  
//     // Handle new messages
//     socket.on("newMessage", function (message) {
//       messagesList.push(message);
//       io.emit("messageReceived", message);
//     });
  
//     // Handle disconnection
//     socket.on("disconnect", function () {
//       console.log("A user disconnected");
//     });
//   });

// Additional server configurations and routes...

// Load data
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

io.on("connection", function (socket) {
    console.log("A user connected");
  
    socket.on("disconnect", function () {
      console.log("User disconnected");
    });
  });
  
