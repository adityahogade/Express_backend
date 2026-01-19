const express = require("express")
const pool = require("../db/pool")
const result=require("../utils/result")
const cryptojs=require("crypto-js")
const {checkAuthorization}=require("../utils/auth")

const router = express.Router()


router.post("/register-to-course", (req, res) => {
  const { courseId, email, name, mobileNo } = req.body;

  const sql = "INSERT INTO students (course_id,email, name, mobile_no) VALUES (?,?,?,?)"
  pool.query(sql, [courseId,email, name, mobileNo],(err,data) => 
    {
        res.send(result.createResult(err,data))
   
        });
    });
    router.get('/all-stu',(req,res)=>{
    const sql='SELECT s.reg_no, s.name, s.email, s.mobile_no, c.course_name FROM students s JOIN courses c ON s.course_id = c.course_id'

    pool.query(sql,(err,data)=>{
        if(err){
            res.send(result.createResult(err,null))
        }
        res.send(result.createResult(null,data))
    })
})


router.get("/my-courses",(req, res) => {
    const email = req.headers.email;
    const sql = "select s.name,s.email,s.mobile_no, c.course_id,c.course_name,c.description,c.fees,c.start_date,c.end_date from students s INNER JOIN courses c ON c.course_id=s.course_id WHERE email=?"
    pool.query(sql,[email],(err, data) => {
    res.send(result.createResult(null,data))
  })
})

router.put("/change_pass",(req,res)=>{
    const {new_pass,conferm_pass,email}=req.body
    if(new_pass==conferm_pass){
    const hashedPassword = cryptojs.SHA256(conferm_pass).toString()
    const sql="UPDATE user SET password=? WHERE email=?"
    pool.query(sql,[hashedPassword,email],(err, data) => {
    res.send(result.createResult(err,data))
  })
}
else{
    res.send("Password Not Matched !!")
}
})


router.get("/my-courses_with_video",(req,res)=>{
    const email=req.headers.email
    const sql="SELECT c.course_name, v.title, v.youtube_url FROM students s JOIN courses c ON s.course_id = c.course_id JOIN video v ON v.course_id = c.course_id WHERE s.email = ?"
    pool.query(sql,[email],(err, data) => {
    res.send(result.createResult(err,data))
  })
})

router.get('/show', (req, res) => {
    const email = req.headers.email;  
    const sql = `
        SELECT name, email, mobile_no 
        FROM students 
        WHERE email = ?
    `;
    pool.query(sql, [email], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

module.exports=router