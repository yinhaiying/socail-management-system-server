const Router = require('koa-router');
const router = new Router();
const gravatar = require('gravatar');
// 加密
const bcrypt = require('bcrypt');
// 引入User
const User = require('../../models/User.js');

/**
* @route Get  api/users/test
* @desc 测试接口地址
* @access 接口是公开的
*/
router.get('/test',async ctx => {
    ctx.status = 200;
    ctx.body = 'hello,world';
});


/**
* @route Get  api/users/register
* @desc 注册地址
* @access 接口是公开的
*/
router.post('/register',async ctx => {
    // 通过body-parser获取到前端传递过来的内容
    const {username,email,password} = ctx.request.body;
    // 将数据存入数据库
    const findResult =  await User.find({username});
    if(findResult.length > 0){
        ctx.body = {
            msg:'用户名已注册'
        }
    }else{
        const avatar =  gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});
        const newUser = new User({
           username,email,password,avatar
        });
        await bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                console.log(hash)
                if(err){
                    throw new Error(err);
                }
                newUser.password = hash;
            });
        });
        // 存储到数据库
        await newUser.save().then((user) => {
            console.log(user)
            ctx.body = user;
        }).catch((error) => {
            console.log(error);
        })
        // 返回数据
        ctx.body = {
            user:newUser
        }
    }
});


module.exports = router;
