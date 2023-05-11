const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const db = require('./models')

// Routers
const eventRouter = require('./routes/Events')
app.use('/events', eventRouter)

const PORT = process.env.PORT || 8080;
db.sequelize.sync().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on: http://localhost:8080`)
    });
});
