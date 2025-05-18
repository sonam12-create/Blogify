import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import blogRouter from './routes/blogRoutes.js'


// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors({credentials: true, origin: '*'}))
app.use(express.urlencoded({ extended: true }));


// API endpoints
app.use('/api/blogs', blogRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send('API WORKING fine')
})

app.listen(port, () => console.log("server started", port))