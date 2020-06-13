const Router = require('koa-router');
const router = new Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport');
// 引入User
const User = require('../../models/User.js');
const {tools} = require('../../util/utils');

// 引入验证
const {validateRegisterData} = require('../../validation/register');
const {validateLoginData} = require('../../validation/login');


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
    const {msg,isValid} = validateRegisterData(ctx.request.body);
    if(!isValid){
      ctx.status = 400;
      ctx.body = {
          code:1,
          msg
      }
      return;
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
            ctx.body = {
                code:0,
                msg:'注册成功'
            }
        }).catch((error) => {
            console.log(error);
        })
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
    const {msg,isValid} = validateLoginData(ctx.request.body);
    if(!isValid){
      ctx.status = 400;
      ctx.body = {
          code:1,
          msg
      }
      return;
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
        const user = findUser[0];
        const checkResult =  bcrypt.compareSync(password, user.password); 
       
        if(checkResult){
            // 验证通过  生成token
            //  jwt根据哪些字段信息生成token 自行设置
            const payLoad = {
                id:user.id,
                username:user.username,
                avatar:user.avatar
            }
            const token = jwt.sign(payLoad,"secret",{expiresIn:3600})  // secret可以随意设置
            ctx.status = 200;
            // 这里token的值必须是Bearer+空格 + token
            ctx.body = {
                code:0,
                msg:'success',
                token:"Bearer " + token
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



/**
* @route Get  api/users/get_user
* @desc 返回用户信息, 
* @access 接口是私密的，必须给token
*/

router.get('/get_user',passport.authenticate('jwt', { session: false }),async ctx => {
  const  {_id,username,email,avatar} = ctx.state.user;
  ctx.body = {
      user:{
          id:_id,
          username,
          email,
          avatar
      }
  }
})



module.exports = router;
