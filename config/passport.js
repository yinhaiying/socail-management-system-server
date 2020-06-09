

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Mongoose = require('mongoose');
const User = require('../models/User.js');
module.exports = passport => {

    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';
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
}