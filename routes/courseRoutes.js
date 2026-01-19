const pool=require('../db/pool')
const result=require("../utils/result")

const {checkAuthorization}=require("../utils/auth")

const express=require('express')
const router=express.Router()

router.get("/upcomming",(req,res)=>{
    const sql = 'select *  from courses where start_date >  CURRENT_DATE '
    pool.query(sql,(err,data)=>{
         if(err){
            res.send(result.createResult(err,null))
         }
         res.send(result.createResult(null,data))
    })
})


router.get("/active_course",(req,res)=>{
    const sql = 'select *  from courses where start_date <=  CURRENT_DATE AND  CURRENT_DATE <= end_date'
    pool.query(sql,(err,data)=>{
         if(err){
            res.send(result.createResult(err,null))
         }
         res.send(result.createResult(null,data))
    })
})



router.get('/',(req,res)=>{
    const sql='SELECT * FROM courses'

    pool.query(sql,(err,data)=>{
        if(err){
            res.send(result.createResult(err,null))
        }
        res.send(result.createResult(null,data))
    })
})


router.post('/add',checkAuthorization,(req,res)=>{
    const {course_name, description, fees, start_date, end_date, video_expiry_days } =req.body
    const sql='INSERT INTO courses (course_name, description, fees, start_date, end_date, video_expiry_days) VALUES (?,?,?,?,?,?)'

    pool.query(sql,[course_name, description, fees,start_date, end_date, video_expiry_days],(err,data)=>{
        if(err){
            res.send(result.createResult(err,null))
        }
        else{
            res.send(result.createResult(null,data))
        }
    })

})

router.put('/update/:courseid',checkAuthorization,(req,res)=>{
    const c_id=req.params.courseid
    console.log(c_id);
    const {course_name, description, fees, start_date, end_date, video_expiry_days } =req.body
    const sql="UPDATE COURSES SET course_name=?,description=?,fees=?,start_date=?,end_date=?,video_expiry_days=? WHERE course_id=?"
    pool.query(sql,[course_name, description, fees,start_date, end_date, video_expiry_days,c_id],(err,data)=>{
    if(err){
        res.send(result.createResult(err,null))
    }            
    else{
        res.send(result.createResult(null,data))
    }
    })

})

router.delete('/delete/:courseid',checkAuthorization,(req,res)=>{
    const c_id=req.params.courseid
    const sql='DELETE FROM courses WHERE course_id=?'
    pool.query(sql,[c_id],(err,data)=>{
      if(err){
        res.send(result.createResult(err,null))
    }            
    else{
        res.send(result.createResult(null,data))
    }   
    })
})

module.exports=router