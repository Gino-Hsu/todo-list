const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser') // 引用 body-parser
const methodOverride = require('method-override') // 引用 metnod-override


const routes = require('./routes')
require('./config/mongoose')

const app = express()
// 如果在 Heroku 環境則使用 process.env.PORT
// 否則為本地環境，使用 3000 
const PORT = process.env.PORT || 3000

// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
// 建立一個名為 hbs 的樣板引擎，並傳入 exphbs 與相關參數
app.engine('hbs', exphbs({ defaultLayouts: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})