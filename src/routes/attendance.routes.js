import { Router } from 'express'
import {getAttendance} from '../controller/attendance.controller.js'
const router = Router()

router.get('/attendance', getAttendance)





export default router