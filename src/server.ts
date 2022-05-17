import express, {Express, Request, Response} from 'express'
import { SERVER_PORT } from './constant'
import { allowCrossDomain } from './middleware/security/cors'
import Router from './routes/router'

const server : Express = express()

server.disable('x-powered-by')
server.use(allowCrossDomain)

server.use(express.urlencoded({extended :true}))
server.use(express.json())

server.use('/', Router)

server.listen(SERVER_PORT, ()=> {
    console.log('Server Started at Port 3000')
})