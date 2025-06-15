import { connetDB } from "../config/db.js";

const db = connetDB()

// enroll student
export const enrollStudent = (req,res) => {
    const {  courseId,enrollDate,status,studentId } = req.body
    const stud_id = Number(studentId)
    
    const enrollExist = "SELECT * FROM enrollments WHERE student_id = ? AND course_id = ?"
    db.query(enrollExist,[stud_id,courseId],(err,data) => {
       if(err){
          console.log("error occur while checking the existance of enrollments",err);       
          return res.status(500).json({error:"error occur while checking the existance of enrollments"})
       }
      if(data.length > 0) return res.status(400).json({error:"This student already enrolled"})
      
       const sql = "INSERT INTO enrollments(student_id,course_id,enrollment_date,status) VALUES(?,?,?,?)"
       db.query(sql,[stud_id,courseId,enrollDate,status],(err,result) => {
          if(err) return res.status(500).json({error:"error while inserting into enrollments"})
          return res.status(201).json({message:"enrolled successfully"})
 
       })
    }) 
}


// get enrolled student
export const getEnrolledStud = (req,res) => {
    const sql = `
    SELECT
       enrollments.id,
       enrollments.enrollment_date,
       enrollments.status,
       students.id AS student_id,
       students.first_name AS student_first_name,
       students.last_name AS student_last_name,
       courses.id AS course_id,
       courses.course_name
       FROM enrollments
       JOIN students ON enrollments.student_id = students.id
       JOIN courses ON enrollments.course_id = courses.id;
   `
    db.query(sql,(err,result) => {
    if(err) return res.status(500).json({error:"error while fetching enrollments"})
    return res.json(result)
    });
}

// delete enrolled student
export const deleteEnrolledStudent = (req,res) => {
    const id = Number(req.params.id)
    const sql = "DELETE FROM enrollments WHERE id = ?"
    db.query(sql,[id],(err,result) => {
      if(err) return res.status(500).json({error:"error while deleting enrollments"})
      return res.json({message:"deleted successfully"})
    })
}