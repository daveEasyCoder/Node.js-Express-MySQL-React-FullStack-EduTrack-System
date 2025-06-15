import express from 'express'
import { getAllCourse,updateCourse,deleteCourse,getCourse,addCourse } from '../controllers/courseControllers.js'
const router = express.Router()

router.post("/add-course",addCourse)
router.put("/update-course/:id",updateCourse)
router.delete("/delete-course/:id",deleteCourse)
router.get("/get-course/:id",getCourse)
router.get("/course-list",getAllCourse)

export default router