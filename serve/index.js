// todo:验证token
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const userRouter = require('./router')
const expressjwt = require('express-jwt')
const app = express()
app.use(cors())
app.use(expressjwt({ secret: 'zzmlovesyj' }).unless({
    path: [/^\/api\/blog/]
}))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/api', userRouter)

app.use('/uploads', express.static(__dirname + '/uploads'))
app.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000/');
}) 