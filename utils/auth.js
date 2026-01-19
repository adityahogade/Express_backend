
const jwt = require("jsonwebtoken")
const config = require("./config.js")
const result = require("./result")

function authUser(req,res,next){
    const allowedUrl = ["/user/signup","/user/signin","/courses/active_course","/courses/upcomming"]
    if(allowedUrl.includes(req.url)) return next();
    else{
        const token = req.headers.token

        if(!token) res.send(result.createResult("token is missing"));
        else{
            try{
            const payload = jwt.verify(token,config.SECRET);
            console.log(payload)
            req.headers.email = payload.email
            req.headers.role = payload.role
            return next();
            }
            catch(ex){
                console.log(ex)
                return res.send(result.createResult("token is invalid"))
            
            }

        }

    }
}


function checkAuthorization(req, res, next) {
    if (req.headers.role == "admin")
        next()
    else
        res.send(result.createResult("You are not authorized"))
}


module.exports ={authUser,checkAuthorization}