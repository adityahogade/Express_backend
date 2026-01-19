const express = require('express');
const courseRoutes=require('./routes/courseRoutes')
const studrouter=require("./routes/student")
const videoRoutes=require("./routes/videoRouters")
const admin=require("./routes/admin")
const user=require("./routes/user")
const cors =require('cors')


const {authUser} =require("./utils/auth")


const app=express();
app.use(cors())
app.use(authUser);
app.use(express.json());


app.use("/user",user)
app.use('/courses',courseRoutes)
app.use("/student",studrouter)
app.use("/video",videoRoutes)
app.use("/admin",admin)


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})