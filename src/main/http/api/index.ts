/**
 * index
 * @author: oldj
 * @homepage: https://oldj.net
 */

import express from 'express'
import list from './list'
import toggle from './toggle'
import add from './add'
import off from './off'
import on from './on'
import active from './active'
import test from './test'
import op from './op'

const router = express.Router()

router.get('/list', list)
router.get('/toggle', toggle)
router.post('/add', add)
router.post('/off', off)
router.post('/on', on)
router.post('/op', op)
router.get('/active', active)
router.get('/test', test)


export default router
