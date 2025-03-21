require("dotenv").config();
const express = require('express')
const cors = require('cors');

const app = express()
const port = 5000

app.use(express.json()); // ✅ Parse JSON requests
app.use(cors()); 
const mongoDB =require("./db")
(async () => {
   await mongoDB(); // Call async function properly
});
const cors = require('cors');
app.use(cors());

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
})


app.use(express.json())
app.use('/api',require("./routes/CreateUser"));
app.use('/api',require("./routes/DisplayData"));
app.use('/api',require("./routes/OrderData"));
<<<<<<< HEAD

=======
>>>>>>> 04b3cae5e91c3d5656dc058712ec7a73a87ec9b0
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})