var express = require("express");
var app = express();
const path = require("path"); 
const fs = require("fs");
const pdfjsLib = require('pdfjs-dist');
const PDFParser = require('pdf-parse');
const util = require('util');
const stat = util.promisify(fs.stat);
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
    app.post('/uploadDocument', upload.array('documents'), async (req, res) => {
        const body = req.body;
        let documents = req.files;
        // console.log(documents);
        
        const documentData = await Promise.all(req.files.map(async (file) => {
          const buffer = fs.readFileSync(file.path);
          const base64 = buffer.toString('base64');
          const pageNumber = 1;
          try {
            let base64String;
            let singlePage;
            let totalPages;
        
            if (file.mimetype === 'application/pdf') {
              base64String = await pageToBase64(file.path, pageNumber);
              singlePage = base64String;
              totalPages = await calculateTotalPages(file.path);
            } else if (file.mimetype === 'text/plain') {
              base64String = base64; // Use the original base64 content for TXT files
              singlePage = null;
              totalPages = 1; // TXT files are treated as single-page documents
            } else {
              console.log('Skipping unsupported file:', file.originalname);
              return null;
            }
        
            const stats = await stat(file.path);
            const fileSizeKB = Math.ceil(stats.size / 1024);
        
            return {
              originalname: file.originalname,
              buffer: base64,
              singlePage: singlePage,
              sizeKB: fileSizeKB,
              totalPages: totalPages,
            };
          } catch (error) {
            console.error(error);
            return null; // Handle error case if necessary
          }
        }));
      
        const filteredDocumentData = documentData.filter((data) => data !== null);
       
        let fileUrl = {
          id: +body.id,
          senderID: +body.senderID,
          addedOn: body.addedOn,
          fileDocument: filteredDocumentData,
          messageType: body.messageType,

        };
      
        io.emit('newDocument', fileUrl);
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

  async function pageToBase64(pdfPath, pageNumber) {
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const pdf = await pdfjsLib.getDocument(data).promise;
    const page = await pdf.getPage(pageNumber);
    const pageData = await page.getTextContent();
    const pageText = pageData.items.map(item => item.str).join('');
    const base64 = Buffer.from(pageText).toString('base64');
    return base64;
  }

  async function calculateTotalPages(filePath) {
    const pdfBuffer = fs.readFileSync(filePath);
    const pdfData = await PDFParser(pdfBuffer);
    return pdfData.numpages;
  }

  
  
  
  
  

  






  
  
  



  