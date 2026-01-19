const express = require('express')
const cryptojs = require('crypto-js')
const jwt =require("jsonwebtoken")

const pool = require('../db/pool')
const result = require('../utils/result')
const config=require("../utils/config")


const router = express.Router()

router.post('/signin', (req, res) => {
    const { email, password } = req.body

    const sql = `SELECT * FROM user WHERE email=? AND password=?`
    const hashedPassword = cryptojs.SHA256(password).toString()
    pool.query(sql, [ email, hashedPassword], (err, data) => {
        if(err){
            res.send(err);

        }
        else if(data.length==0){
            res.send(result.createResult("invalid email or password"))
        }
        else{
            const user=data[0]
            const payload={
                email : user.email,
                role: user.role
            }
            const token = jwt.sign(payload,config.SECRET)

            const userData= {
                email : user.email,
                role : user.role,
                token
            }
            res.send(result.createResult(null,userData))
        }
    })
})

router.post('/signup', (req,res) => {
   
const {email,password} =req.body
const hashedPassword= cryptojs.SHA256(password).toString()
const sql="INSERT INTO user(email,password) VALUES (?,?)"

pool.query(sql,[email,hashedPassword],(err,data)=>{
    res.send(result.createResult(err,data))
})
})



router.get('/', (req, res) => {
    const email = req.headers.email
    const sql = `SELECT * FROM users WHERE email = ?`
    pool.query(sql, [email], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.delete('/', (req, res) => {
    const uid = req.headers.uid
    const sql = `DELETE FROM users WHERE uid = ?`
    pool.query(sql, [uid], (error, data) => {
        res.send(result.createResult(error, data))
    })
})


module.exports = router
