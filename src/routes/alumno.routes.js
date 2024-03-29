import { Router } from 'express'
import {getAlumno,getAlumnoById,createAlumno,updateAlumno,deleteAlumno} from '../controller/alumno.controller.js'
const router = Router()

router.get('/alumno', getAlumno)

router.get('/alumno/:idAlumno', getAlumnoById)

router.post('/alumno', createAlumno)

router.patch('/alumno/:idAlumno', updateAlumno)

router.delete('/alumno/:idAlumno', deleteAlumno)

export default router