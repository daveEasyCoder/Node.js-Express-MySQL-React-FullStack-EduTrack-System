import express from 'express'
import { addTeacher,deleteTeacherById,updateTeacher,getAllTeachers,getTeacher } from '../controllers/teacherControllers.js'

const router = express.Router()

router.post("/add-teacher",addTeacher)
router.get("/teacher-list",getAllTeachers)
router.delete("/delete-teacher/:id",deleteTeacherById)
router.get("/get-teacher/:id",getTeacher)
router.put("/update-teacher/:id",updateTeacher)

export default router