import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
import Router from './routes/router'

dotenv.config()

const server : Express = express()
const port = process.env.PORT

server.use('/', Router)

server.listen(port, ()=> {
    console.log('Server Started at Port 3000')
})