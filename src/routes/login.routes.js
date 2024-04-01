import { Router } from 'express'
import {getLogin,getLoginByEmail,deleteLogin, updateLogin} from '../controller/login.controller.js'
const router = Router()

router.get('/login', getLogin)

router.get('/login/:mail', getLoginByEmail)


router.patch('/login/:idstudent', updateLogin)

router.delete('/login/:idstudent', deleteLogin)

export default router