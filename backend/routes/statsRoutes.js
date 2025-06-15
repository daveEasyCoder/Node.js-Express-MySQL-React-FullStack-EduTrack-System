import express from 'express'
import { getStats } from '../controllers/statsControllers.js'

const router = express.Router()

router.get("/stat",getStats)
export default router