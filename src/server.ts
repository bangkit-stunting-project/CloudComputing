import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'

dotenv.config()

const server : Express = express()
const port = process.env.PORT

server.listen(port, ()=> {
    console.log('Server Started at Port 3000')
})