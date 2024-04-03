import { Router } from 'express'
import {getAttendance,getAttendanceById} from '../controller/attendance.controller.js'
const router = Router()

router.get('/attendance', getAttendance)

router.get('/attendance/:idAttendance', getAttendanceById)





export default router