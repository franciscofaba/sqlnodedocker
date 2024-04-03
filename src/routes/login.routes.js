import { Router } from 'express'
import {getLogin,getLoginByEmail} from '../controller/login.controller.js'
const router = Router()

router.get('/login', getLogin)

router.get('/login/:mail', getLoginByEmail)





export default router