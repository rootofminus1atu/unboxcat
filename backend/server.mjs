import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { catRoutes } from './cat/controller.mjs'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const port = process.env.PORT || 3000
const mongoUri = process.env.MONGO_URI || ""
export const apiKey = process.env.API_KEY

if (!mongoUri || !apiKey) {
    throw new Error("Required environment variables are missing.")
}

const app = express()

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/hi', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use("/cats", catRoutes)

mongoose.connect(mongoUri)
    .then(() => {
        console.log('connected to mongo')

        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
    .catch(err => console.log(err))