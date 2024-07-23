const mongoose = require('mongoose')

mongoose.set("strictQuery",false)

mongoose
.connect("mongodb://127.0.0.1:27017/watcher")
.then(()=>console.log('db connected successfully'))
.catch((err)=>console.log(err.message))
