import { connetDB } from "../config/db.js";
const db = connetDB()

// Get all students
export const getAllStudents = (req,res) => {
    const sql = "SELECT * FROM students"
    db.query(sql,(err,data) => {
       if(err){
          // console.log("error in fetching students",err);
          return res.status(500).json({error:"Error in fetching students"}) 
       }
      return res.json(data)
   
    })
}

// Add a new student
export const addStudent = (req,res) => {
    const {firstname,lastname,gender,birthdate,email,phone,address,dep,section,year,parentName,parentGender,parentAddress,parentEmail,parentPhone,parentBirthdate} = req.body

    const query = "SELECT * FROM students WHERE email = ?"
    db.query(query,[email],(err,data) => {
      if(err){
       // console.error("Error checking email:", err);
       return res.status(500).json({error:"Database error while checking email"})
      } 
      if(data.length > 0){
       return res.status(400).json({error:"Student Email is Already taken"})
      }
      
          //  INSERT INTO parents TABLE
          const sql = "INSERT INTO parents(name,gender,birthdate,email,phone,address) VALUES(?,?,?,?,?,?)";
          db.query(sql,[parentName,parentGender,parentBirthdate,parentEmail,parentPhone,parentAddress],(err,parentResult) => {
             if(err){
                console.error("Error inserting parent:", err);
               return res.status(500).json({error:"error occur in database while inserting parent"})
             }
             const parent_id = parentResult.insertId
    
             // INSERT INTO students TABLE
             const studSql =  "INSERT INTO students(parent_id,first_name,last_name,gender,birthdate,email,phone,address,department,year,section) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
             db.query(studSql,[parent_id,firstname,lastname,gender,birthdate,email,phone,address,dep,year,section],(err,studResult) => {
                if(err){
                   return res.status(500).json({error:"error occur in database while inserting student"})
                }
                return res.status(201).json({message:"student and parent created successfully",studResult})
             })
          })
 
    })
}


// delete student by id
 export const deleteStudentById = (req,res) => {
    const id = Number(req.params.id)
    const getParentEdQuery = "SELECT parent_id from students WHERE id = ?"
    db.query(getParentEdQuery,[id],(err,result) => {
       if(err || result.length === 0){
          return res.status(500).json({error:"Student not found"})
       }
 
       const parentId = result[0].parent_id
       const sql = "DELETE FROM parents WHERE id = ?"
       db.query(sql,[parentId],(err,data) => {
          if (err) {
             // console.log("Error to delete student",err); 
             return res.status(500).json({error:"Error to delete student"})
          }
          if(data.affectedRows === 0){
             return res.status(500).json({error:"student not found"})
          }
          return res.json({error:"student deleted successfully"})
       })
    })
 }

//  get each student
export const getEachStudent = (req,res) => {
    const id = Number(req.params.id)
    const query = `
                select s.first_name,s.last_name,s.gender,s.birthdate,s.email,s.phone,
                s.address,s.department,s.year,s.section,p.name,p.gender as parent_gender,
                p.birthdate as parent_birthdate,p.email as parent_email,p.phone as parent_phone,p.address as parent_address
                FROM students s JOIN parents p
                WHERE s.parent_id = p.id AND s.id = ?;
              `
    db.query(query,[id],(err,data) => {
       if(err){
          console.log("Error in fetching students",err);
          return res.status(500).json({error:"student not found"})
       }
       return res.json(data[0])
    })
}


// update student 
export const updateStudent = (req,res) => {
    const {firstname,lastname,gender,birthdate,email,phone,address,dep,section,year,parentName,parentGender,parentAddress,parentEmail,parentPhone,parentBirthdate} = req.body
    const formattedBirthdate = new Date(birthdate).toISOString().split('T')[0];
    const formattedParentBirthdate = new Date(parentBirthdate).toISOString().split('T')[0];
 
    const id = Number(req.params.id)
    const getParentIdQuery = "SELECT parent_id from students WHERE id = ?"
    db.query(getParentIdQuery,[id],(err,result) => {
       if(err){
          console.log("Error when finding parent id");
          return res.status(500).json({error:"parent id not found"})
       }
       if (result.length === 0) {
          return res.status(404).json({ error: "Student not found" });
       }
 
          const parentId = result[0].parent_id
 
          const studentQuery = `
          UPDATE students SET
             first_name = ?,
             last_name = ?,
             gender = ?,
             birthdate = ?,
             email = ?,
             phone = ?,
             address = ?,
             department = ?,
             year = ?,
             section = ?
          WHERE id = ?;
       `
       db.query(studentQuery,[firstname,lastname,gender,formattedBirthdate,email,phone,address,dep,year,section,id],(err,studResult) => {
       if(err){
          console.log("Error in updating student",err);
          return res.status(500).json({error:"Error in updating student"})
       }
      
        const parentQuery = `
          UPDATE parents SET
             name = ?,
             gender = ?,
             birthdate = ?,
             email = ?,
             phone = ?,
             address = ?
          WHERE id = ?;
       `
       db.query(parentQuery,[parentName,parentGender,formattedParentBirthdate,parentEmail,parentPhone,parentAddress,parentId],(err,parentResult) => {
          if(err){
             console.log("error in database while updating parent",err);
             return res.status(500).json({error:"error when updating parent"})
          }
          return res.json({
             message: "Student and parent updated successfully",
             studentUpdate: studResult,
             parentUpdate: parentResult,
           });
       })
 
       })
    })
}