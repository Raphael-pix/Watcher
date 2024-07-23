const express = require('express')
const router = require('./route/route')
const cors = require('cors')
require('./db')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api',router)

app.get('/',(req,res)=>{
    res.send('hello')
})


app.listen(5000,()=>{
    console.log('connected at port 5000')
})