import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js'
import teacherRoutes from './routes/teacherRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import enrollmentRoutes from './routes/enrollmentRoutes.js'
import statsRoutes from './routes/statsRoutes.js'

dotenv.config();

const app = express();
const PORT =  process.env.PORT || 8081;

app.use(express.json())
app.use(cors())

 
app.use('/api/students',studentRoutes)
app.use('/api/teachers',teacherRoutes)
app.use('/api/courses',courseRoutes)
app.use('/api/enrollments',enrollmentRoutes)
app.use('/api/stats',statsRoutes)



app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
})


