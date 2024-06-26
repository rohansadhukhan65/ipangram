import express from 'express'
import { test } from './handlers/test-api.js'
import { login } from './handlers/login.js'
import { signup } from './handlers/signup.js'
import { allEmpFetch } from './handlers/fetchAllEmp.js'
import { DeleteDepartMents, GetAllDepartments, departmentAdd, departmentEdit } from './handlers/departmentAdd.js'

const router = express.Router()

// define Routes gere ......
router.get('/',test)
router.post('/login',login)
router.post('/register',signup)
router.get('/fetch-emp',allEmpFetch)
router.post('/create-departments',departmentAdd)
router.get('/get-all-departments',GetAllDepartments)
router.post('/delete-department',DeleteDepartMents)
router.post('/edit-department',departmentEdit)

export default router