const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const multer = require('multer');
const cors = require('cors');
const routes = require('./routes')
dotenv.config();

const app = express()
const port = process.env.PORT || 3005

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

// const fileStorageEngine = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './uploads'); // Ensure this directory exists
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '--' + file.originalname);
//     }
//   });
// const upload = multer({ storage: fileStorageEngine });
  
// app.post('/upload', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'document', maxCount: 1 }]), async (req, res) => {
//     const { title, content } = req.body;
//     const imagePath = req.files['image'] ? req.files['image'][0].path : '';
//     const documentPath = req.files['document'] ? req.files['document'][0].path : '';
  
//     try {
//       const newArticle = await Article.create({ title, content, imagePath, documentPath });
//       res.status(201).send(newArticle);
//     } catch (error) {
//       res.status(500).send(error);
//     }
// });
  
// // Serve static files
// app.use('/uploads', express.static('uploads'));

routes(app)

mongoose.connect(`${process.env.MONGODB}`)
    .then(() => {
        console.log('Connect Db success!')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(port, () => {
    console.log('Server is running in port: ', + port)
})