const Router = require('koa-router');
const router = new Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
// 引入User
const User = require('../../models/User.js');
const {tools} = require('../../util/utils');
console.log(tools);
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
    let checkArr = [
        { value:username,msg:'用户名不能为空'},
        { value:email,msg:'邮箱不能为空'},
        { value:password,msg:'密码不能为空'},
    ];
    let result = tools.validate(checkArr);
    if(!result.result){
        ctx.body = {
            code:1,
            message:result.msg
        };
        return ;
    }
    // 将数据存入数据库
    const findResult =  await User.find({username});
    console.log(findResult)
    if(findResult.length > 0){
        ctx.body = {
            msg:'用户名已注册'
        }
    }else{
        const avatar =  gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});
        const newUser = new User({
           username,
           email,
           password:tools.enbcrypt(password),
           avatar
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


/**
* @route Get  api/users/login
* @desc 登录接口地址 返回token
* @access 接口是公开的
*/

router.post('/login',async ctx => {
    // 查询当前登录的邮箱是否存在
    const {email,password} = ctx.request.body;
    let checkArr = [
        { value:email,msg:'邮箱不能为空'},
        { value:password,msg:'密码不能为空'},
    ];
    let result = tools.validate(checkArr);
    if(!result.result){
        ctx.body = {
            code:1,
            message:result.msg
        };
        return ;
    }
    const findUser = await User.find({email});
     if(findUser.length === 0){
         console.log(ctx.status)
         ctx.status = 404;
         ctx.body = {
             code:1,
             msg:'用户不存在'
         }
     }else{
        //  验证密码
        const checkResult =  bcrypt.compareSync(password, findUser[0].password); 
        if(checkResult){
            ctx.status = 200;
            ctx.body = {
                code:0,
                msg:'success'
            }
        }else{
            ctx.status = 400;
            ctx.body = {
                code:1,
                msg:'密码错误'
            }
        }

     }
})



module.exports = router;
