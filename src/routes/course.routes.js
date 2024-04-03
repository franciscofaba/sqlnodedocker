import { Router } from 'express'
import {getCourse,getCourseByCareer} from '../controller/course.controller.js'
const router = Router()

router.get('/Course', getCourse)

router.get('/Course/:idCareer', getCourseByCareer)





export default router