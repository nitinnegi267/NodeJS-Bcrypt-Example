const express = require('express')
const app = express()

app.use(express.json())

const alienRouter = require('./routes/aliens')
app.use('/aliens', alienRouter)

app.listen(3000, function(){
console.log('Server Started')

})