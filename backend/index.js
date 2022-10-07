const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())


// Available Routes
app.use('/auth', require('./routes/auth'))
app.use('/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello Michelle!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

