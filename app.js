if(process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',router)

app.use(errorHandler)
// app.listen(PORT,()=>{
//   console.log(`App runing at PORT ${PORT}`);
// })
module.exports =app