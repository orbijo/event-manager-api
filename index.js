const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const db = require('./models')

// Routers
const eventRouter = require('./routes/Events')
const userRouter = require('./routes/Users')
const scheduleRouter = require('./routes/Schedules')
app.use('/events', eventRouter)
app.use('/schedules', scheduleRouter)
app.use('/auth', userRouter)

const PORT = process.env.PORT || 8080;
db.sequelize.sync().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on: http://localhost:8080`)
    });
});
