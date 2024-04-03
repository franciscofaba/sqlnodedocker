import { Router } from 'express'
import {getCourse,getCourseByCareer} from '../controller/course.controller.js'
const router = Router()

router.get('/course', getCourse)

router.get('/course/:idCareer', getCourseByCareer)





export default router