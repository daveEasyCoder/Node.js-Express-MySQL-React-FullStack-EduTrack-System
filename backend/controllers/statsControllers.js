import { connetDB } from "../config/db.js";

const db = connetDB()

export const getStats = (req,res) => {
    const stats = {};
 
    db.query('SELECT COUNT(*) AS count FROM students', (err, result) => {
      if (err){
       console.log(err);
       return res.status(500).json({ error: err.message });
      }
      stats.totalStudents = result[0].count;
  
      db.query('SELECT COUNT(*) AS count FROM teachers', (err, result) => {
        if (err){
          console.log(err);
          return res.status(500).json({ error: err.message });     
        }
        stats.totalTeachers = result[0].count;
  
        db.query('SELECT COUNT(*) AS count FROM courses', (err, result) => {
          if (err) {
             console.log(err);
             return res.status(500).json({ error: err.message });
             
          }
          stats.totalCourses = result[0].count;
  
          db.query('SELECT COUNT(DISTINCT department) AS count FROM students', (err, result) => {
            if (err){
             console.log(err);
             return res.status(500).json({ error: err.message });
             
            }
            stats.totalDepartments = result[0].count;
  
            db.query("SELECT COUNT(*) AS count FROM students WHERE gender = 'Male'", (err, result) => {
              if (err){
                console.log(err);
                return res.status(500).json({ error: err.message });
                
              }
              stats.totalMale = result[0].count;
  
              db.query("SELECT COUNT(*) AS count FROM students WHERE gender = 'Female'", (err, result) => {
                if (err){
                   console.log(err);  
                   return res.status(500).json({ error: err.message });
                }
                stats.totalFemale = result[0].count;
 
                db.query("SELECT COUNT(*) AS count FROM enrollments", (err, result) => {
                   if (err){
                      console.log(err);  
                      return res.status(500).json({ error: err.message });
                   }
                   stats.totalEnrollments = result[0].count;
                    
                   return res.json(stats);
                 });
              });
            });
          });
        });
      });
    });
}