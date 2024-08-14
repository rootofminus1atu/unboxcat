import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { catRoutes } from './cat/controller.mjs'
import cors from 'cors'


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

app.use("/cats", catRoutes)

mongoose.connect(mongoUri)
    .then(() => {
        console.log('connected to mongo')

        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
    .catch(err => console.log(err))