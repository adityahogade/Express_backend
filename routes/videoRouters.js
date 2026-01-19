const pool = require("../db/pool")
const result = require("../utils/result")
const express = require("express")
const router = express.Router()

router.get("/my-videos/:courseId", (req, res) => {
    const courseId = req.params.courseId;
    console.log(courseId)
    const sql = "select * from video where course_id = ?"

    pool.query(sql, [courseId], (err, data) => {
        if (err) {
            res.send(result.createResult(err, null))
        }

        res.send(result.createResult(null, data))
    })

});

router.post("/add", (req, res) => {
    const { video_id, course_id, title, youtube_url, description } = req.body
    const sql = "insert into video(video_id,course_id, title, youtube_url,description,added_at) values(?,?,?,?,?,CURDATE())"
    pool.query(sql, [video_id, course_id, title, youtube_url, description], (err, data) => {
        if (err) {
            res.send(result.createResult(err, null))
        }
        res.send(result.createResult(null, data))
    })
});

router.delete("/delete/:video_id", (req, res) => {
    const video_id = req.params.video_id
    const sql = `DELETE FROM video WHERE video_id=?`
    pool.query(sql, [video_id], (err, data) => {
        if (err) throw err;
        res.send("data deleted")
    })
});

router.put("/update/:video_id", (req, res) => {
    const { course_id, title, youtube_url, description, video_id } = req.body
    const sql = `UPDATE video SET course_id=?,title=?,youtube_url=?,description=? WHERE video_id=?`
    pool.query(sql, [course_id, title, youtube_url, description, video_id], (err, data) => {
        if (err) throw err;
        res.send(result.createResult(null, data))
    })
});

router.get("/all-videos", (req, res) => {
    const sql = "select * from video"  
    pool.query(sql, (err, data) => {
        if (err) {
            res.send(result.createResult(err, null))
        }
        res.send(result.createResult(null, data))
    });

});


module.exports = router;
