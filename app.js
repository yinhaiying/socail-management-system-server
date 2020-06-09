const koa = require('koa');
const Router = require('koa-router');
const mongoose  = require('mongoose');
const config = require('./config/keys.js');
const users = require('./routes/api/users.js');
const bodyParser = require('koa-body-parser');

// 实例化koa
const app = new koa();
const router = new Router();

app.use(bodyParser())

const passport = require('koa-passport')   // 用于验证和获取token
app.use(passport.initialize())
app.use(passport.session())



// passport的验证和获取token
require('./config/passport')(passport)

// 路由
router.get('/', async ctx => {
  ctx.body = 'hello,world'
})



// 连接数据库  这里使用的是mongodb aws免费的数据库 (https://cloud.mongodb.com/)
const db = mongoose.connect(config.mongoURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('mongodb 连接成功');
}).catch((err) => {
  console.log('mongodb连接失败:'+err);
})

router.use('/api/users',users.routes());

// 配置路由地址  访问localhost:5000/api/users  会进入users.js文件查找路由



// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`server running on ${port}`);
})