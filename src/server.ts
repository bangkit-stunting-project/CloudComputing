import express, {Express, Request, Response} from 'express'
import { SERVER_PORT } from './constant'
import Router from './routes/router'

const server : Express = express()

server.use('/', Router)

server.listen(SERVER_PORT, ()=> {
    console.log('Server Started at Port 3000')
})