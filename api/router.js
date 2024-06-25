import express from 'express'
import { test } from './handlers/test-api'

const router = express.Router()

// define Routes gere ......
router.get('/',test)

export default router