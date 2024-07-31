import cookieParser from "cookie-parser"
import express from "express"
import errorhandler from "./middlewares/errorHandler.middleware.js"
import cors from "cors"
const app=express()

app.use(cors({
  origin: process.env.ALLOW_URL,
  credentials: true, 
  methods: ['GET', 'POST','PATCH','DELETE'],
  optionsSuccessStatus: 200
}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ALLOW_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);  
  }
  next();
});


//middlewares
app.use(express.json({
  limit:"16kb",
}))

app.use(express.urlencoded({extended:true,limit:"10kb"}))

app.use(cookieParser())

//routes imported here
import { userRouter } from "./routers/user.router.js"
import { activityRouter } from "./routers/activity.router.js"


//routing
app.use('/api/v1/user',userRouter)
app.use('/api/v1/activity',activityRouter)


//error handling middleware
app.use(errorhandler)
export default app
