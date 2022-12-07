const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const rout = require('./router/rout')


const DB_URL = 'mongodb+srv://sourabh:sourabh@cluster0.vvdx1ge.mongodb.net/cointab-assignment' 
const PORT = process.env.PORT || 3002
const app = express();

mongoose.connect(DB_URL).then(_ => console.log('DB connected')).catch(error => console.log(error))

app.use(express.json());
app.use(cors());

app.use('/', rout);

app.listen(PORT, _ => console.log('server start'));
