import express from 'express'
import { getAllStudents,getEachStudent,updateStudent,deleteStudentById,addStudent } from '../controllers/studentControllers.js'

const router = express.Router()

router.post("/add-student",addStudent)
router.get("/student-list",getAllStudents)
router.delete("/delete-student/:id",deleteStudentById)
router.get("/get-student/:id",getEachStudent)
router.put("/update-student/:id",updateStudent)

export default router;

