const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const mainRouter = require('./routes/main')
const nunjucks = require('nunjucks')
const { sequelize } = require('./models')

const app = express()

app.set('port', process.env.PORT || 3000)
app.set('view engine', 'nj')

dotenv.config()

nunjucks.configure('views',{
    express: app,
    watch: true,    
})

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공')
    })
    .catch((err) => {
        console.error(err)
    })

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/',mainRouter)

app.use((req,res,next) => {
    const error = new Error (`${req.url}의 ${req.method} 라우터가 없습니다`)
    error.status = 404;
    next(error)
})

app.use((err,req,res,next) => {
    res.locals.message = err.message
    res.locals.errir = process.env.NODE_ENV ? err : {}
    res.status(err.status || 500 )
    res.render('error')
})

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 서버에서 대기중`)
})