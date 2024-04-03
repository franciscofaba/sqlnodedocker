import { Router } from 'express'
import {getinterClass} from '../controller/interClass.controller.js'
const router = Router()

router.get('/interClass', getinterClass)






export default router

