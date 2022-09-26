// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入模組程式碼
const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const {authenticator} = require('../middleware/auth')
// 將網址結構符合字串的 request 導向模組 
router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/', authenticator, home)


// 匯出路由器
module.exports = router