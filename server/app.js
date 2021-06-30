const express = require('express')
const app = express()
const PORT = 8080
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')


mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo db")
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting",err)
})

require('./models/user')
require('./models/post')
app.use(express.json())
app.use(require('./routes/authorize'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT,()=>{
    console.log("server has started on", PORT)
})