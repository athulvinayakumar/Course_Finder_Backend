
require('dotenv').config()

// express
const express = require('express')

// cors
const cors = require('cors')

// router
const router = require('./Routers/router')

// import connection.js
require('./DB/connections')

// server
const Cserver = express()

// use cors
Cserver.use(cors())

// middleware
Cserver.use(express.json())

// use of router by server
Cserver.use(router)

Cserver.use('/uploads',express.static('./uploads'))

// port
const PORT = 4000 || process.env

// to run server
Cserver.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

// to get request
Cserver.get('/',(req,res)=>{
    res.send(`<h1>Course server running successfully and ready to accept request from client</h1>`)
})