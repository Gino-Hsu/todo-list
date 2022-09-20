const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') // 引用 body-parser
const methodOverride = require('method-override') // 引用 metnod-override

const routes = require('./routes')
require('./config/mongoose')

const app = express()

// 建立一個名為 hbs 的樣板引擎，並傳入 exphbs 與相關參數
app.engine('hbs', exphbs({ defaultLayouts: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})