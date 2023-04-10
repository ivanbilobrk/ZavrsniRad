const express = require('express');
const app = express();
require('dotenv').config({ path: __dirname + '/../.env'});
const cron = require('cron');
const { scheduledFunction } = require('./helpFunctions/scheduledFunction')
const { getAllUnisForYearAndCategory } = require('./db/dbFunctions');


const job = new cron.CronJob('* * * * *', async function() {
    await scheduledFunction();
  }, null, false, 'UTC');
  
app.get('/', require('./routes/getAllTest'))

app.use((req, res)=>{
    res.status(404).json({error: 'Not found'});
})


app.listen(parseInt(process.env.PORT));