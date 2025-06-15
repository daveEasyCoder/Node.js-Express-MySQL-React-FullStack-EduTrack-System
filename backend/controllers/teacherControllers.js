import { connetDB } from "../config/db.js";

const db = connetDB();

// add teacher

export const addTeacher = (req,res) => {
    const {name,email,phone,gender,address,qualification,specialization} = req.body
    const checkStudentEmailQuery = "SELECT * FROM teachers WHERE email = ?"
     db.query(checkStudentEmailQuery,[email],(err,result) => {
        if(err){
           console.log("error when fetching teacher id",err);     
           return res.status(500).json({error:"error when fetching id of teacher"})
        }
        if(result.length > 0) return res.status(400).json({error:"Teacher email already exist"})
        
           const sql = "INSERT INTO teachers(name,email,phone,gender,address,qualification,subject_speciality) VALUES(?,?,?,?,?,?,?)"
           db.query(sql,[name,email,phone,gender,address,qualification,specialization],(err,teacherResult) => {
              if(err){
                 console.log("error while inserting teacher",err);
                 return res.status(500).json({error:"error while inserting teacher"})
              }
              return res.status(201).json({message:"teacher added successfully"})
           })
     })
}

// get all teacher
export const getAllTeachers = (req,res) => {
    const sql = "SELECT * FROM teachers"
    db.query(sql,(err,result) => {
       if(err) return res.status(500).json({error:"error while fetching teachers"})
       return res.json(result)
    })
}

// delete teacher

export const deleteTeacherById = (req,res) => {
    const id = Number(req.params.id)

    const sql = "DELETE FROM teachers WHERE id = ?"
    db.query(sql,[id],(err,result) => {
      if(err) return res.status(500).json({error:"error occur while deleting teacher"})
      return res.json({message:"teacher deleted successfully"})
    })
}

// update teacher
export const updateTeacher = (req,res) => {
    const {name,email,phone,gender,address,qualification,specialization} = req.body
    const id = Number(req.params.id)
    const sql = `
            UPDATE teachers SET
             name = ?,
             email = ?,
             phone = ?,
             gender = ?,
             address = ?,
             qualification = ?,
             subject_speciality = ?
          WHERE id = ?;
        `
    db.query(sql,[name,email,phone,gender,address,qualification,specialization,id],(err,result) => {
        if(err){
          console.log("error while updating",err);   
          return res.status(500).json({error:"error in database while updating course"})
        }
        return res.json({message:"Course updated successfully",result})
    })
}

// get individual teacher
export const getTeacher = (req,res) => {
    const id = Number(req.params.id)
    const sql = "SELECT * FROM teachers WHERE id = ?"
    db.query(sql,[id],(err,result) => {
       if(err) return res.status(500).json({error:"error while fetching teacher detail"})
       return res.json(result[0])
    })
}