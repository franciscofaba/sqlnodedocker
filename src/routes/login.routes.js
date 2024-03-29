import { Router } from 'express'
import {getLogin,getLoginByMail,createLogin,deleteLogin, updateLogin} from '../controller/login.controller.js'
const router = Router()

router.get('/login', getLogin)

router.get('/login/:mail', getLoginByMail)

router.post('/login', createLogin)

router.patch('/login/:idAlumno', updateLogin)

router.delete('/login/:idAlumno', deleteLogin)

export default router