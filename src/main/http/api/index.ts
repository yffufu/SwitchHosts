/**
 * index
 * @author: oldj
 * @homepage: https://oldj.net
 */

import express from 'express'
import list from './list'
import toggle from './toggle'
import add from './add'
import active from './active'
import test from './test'
import op from './op'

const router = express.Router()

router.get('/list', list)
router.get('/toggle', toggle)

router.post('/add', add)
router.post('/op', op) // 操作
router.get('/active', active) // 激活窗口
router.get('/test', test) // 测试连接


export default router
