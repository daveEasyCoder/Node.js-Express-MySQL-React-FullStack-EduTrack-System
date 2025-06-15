import express from 'express'
import { getEnrolledStud,enrollStudent,deleteEnrolledStudent } from '../controllers/enrollmentControllers.js'
const router = express.Router()

router.post("/enroll-student",enrollStudent)
router.get("/get-enrollments",getEnrolledStud)
router.delete("/delete-enrollment/:id",deleteEnrolledStudent)

export default router