
const logger = require('./logger/my_logger')
const path = require('path')
const express = require('express')
const cors = require('cors');

const body_parser = require('body-parser')

const message_router = require('./routers/message_router')

logger.info('==== System start =======')

const app = express()
const port = 3000
app.use(body_parser.json())
app.use(express.static(path.join('.', '/static/'))) 

app.listen(3000, () => {
    logger.info('==== Server started =======')
    console.log('Express server is running ....');
})
app.use(cors());
app.use('/api/message', message_router, (req, res) => {
    res.header('Access-Control-Allow-Origin', 'cloud-memory.onrender.com/');
  });
logger.info('==== System stop =======')