const pool = require("../db/pool")
const result = require("../utils/result")

const express = require("express")

const router = express.Router()

router.get("/enrolled-students/:c_id",(req,res)=>{
   const sql= "select *  from students where course_id=?"
    const cid=req.params.c_id 
    pool.query(sql,[cid],(err,data)=>{
        if(err){
                    res.send(result.createResult(err,null))
                }
                 res.send(result.createResult(null,data))
    })
})

module.exports = router;