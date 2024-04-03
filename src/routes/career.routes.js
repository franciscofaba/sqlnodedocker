import { Router } from 'express'
import {getCareer,getCareerById} from '../controller/career.controller.js'
const router = Router()

router.get('/Career', getCareer)

router.get('/Career/:idCareer', getCareerById)





export default router