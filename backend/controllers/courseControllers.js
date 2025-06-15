import { connetDB } from "../config/db.js";
const db = connetDB()


// get all course
export const getAllCourse = (req,res) => {
    const sql = `
    select c.id,c.course_name,c.desctiption,c.course_id,c.credit_hour,t.name
    from courses c left join teachers t on c.teacher_id = t.id;
  `
    db.query(sql,(err,result) => {
    if(err) return res.status(500).json({error:"error while fetching courses"})
    return res.json(result)
    })
}

//  get all course
export const getCourse = (req,res) => {
    const id = Number(req.params.id)
    const sql = `select c.course_name,c.desctiption,c.course_id,c.credit_hour,c.teacher_id,t.name
                 from courses c left join teachers t on c.teacher_id = t.id where c.id = ?`
    db.query(sql,[id],(err,result) => {
       if(err) return res.status(500).json({error:"error while fetching course"})
       return res.json(result[0])
    })
}

//  delete course
export const deleteCourse = (req,res) => {
    const id = Number(req.params.id)

    const sql = "DELETE FROM courses WHERE id = ?"
    db.query(sql,[id],(err,result) => {
       if(err){
          console.log("error while deleting course",err);
          return res.status(500).json({error:"error while deleteing course"})
          
       }
       return res.json({message:"course deleted successfully"})
    })
}

// update course
export const updateCourse = (req,res) => {
    const {course_name,course_id,description,credit_hour,teacher_id} = req.body
    const id = Number(req.params.id)
    const sql = `
            UPDATE courses SET
             course_name = ?,
             course_id = ?,
             desctiption = ?,
             credit_hour = ?,
             teacher_id = ?
          WHERE id = ?;
        `
    db.query(sql,[course_name,course_id,description,credit_hour,teacher_id,id],(err,result) => {
        if(err){
          console.log("error while updating",err);
          
          return res.status(500).json({error:"error in database while updating course"})
        }
        return res.json({message:"Course updated successfully"})
    })
}

// add course
export const addCourse = (req,res) => {
    const {course_name,course_id,description,credit_hour,teacher_id} = req.body
    const teacherId = Number(teacher_id)
  
    const existCourseQuery = "SELECT * FROM courses WHERE course_name = ? OR course_id = ?"
    db.query(existCourseQuery,[course_name,course_id],(err,data) => {
       if(err) return res.status(500).json({error:"error while checking the existance of course"})
       if(data.length > 0) return res.status(404).json({error:"course already exist"})
 
       const sql = "INSERT INTO courses(course_name,course_id,desctiption,credit_hour,teacher_id) VALUES(?,?,?,?,?)"
       db.query(sql,[course_name,course_id,description,credit_hour,teacherId],(err,result) => {
          if(err){
             console.log("error while inserting course",err);
             
             return res.status(500).json({error:"error while inserting course"})
          }
          return res.status(201).json(result)
       })
 
    })
}
