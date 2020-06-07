const Router = require('koa-router');
const router = new Router();

// 引入User
const User = requrie('../../models/User.js');

/**
* @route Get  api/users/test
* @desc 测试接口地址
* @access 接口是公开的
*/
router.get('/test',async ctx => {
    ctx.status = 200;
    ctx.body = 'hello,world';
});


module.exports = router;