import { Router } from 'express'
import {getStudent,getStudentById,createStudent,updateStudent,deleteStudentById} from '../controller/Student.controller.js'
const router = Router()

router.get('/student', getStudent)

router.get('/student/:idStudent', getStudentById)

router.post('/student', createStudent)

router.patch('/student/:idStudent', updateStudent)

router.delete('/student/:idStudent', deleteStudentById)

export default router