## 关于注册登录的一些注意事项：





### koa-passport 和passport-jwt  解析token
koa-passport的主要功能就是能够提供一个用户鉴权的框架
```javascript
router.get('/get_user',passport.authenticate('jwt', { session: false }),async ctx => {
  const  {_id,username,email,avatar} = ctx.state.user;
})
```
其中passport.authenticate('jwt', { session: false })就是体用jwt鉴权策略
passport-jwt的主要功能是解析token,获取到jwt_payload
```javascript
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        // console.log('payload');
        // console.log(jwt_payload);  // 这里能够获取到id,username,email等信息
        const user = await User.findById(jwt_payload.id)
        if(user){
            return done(null,user);
        }else{
            return done(null,false)
        }
    }));
```