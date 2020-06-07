const mongoose = requrie('mongoose');
const Schema = mongoose.Schema;

// 创建Schema
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

// 将Schema编译成Model  model是用于构造的类。
const User = mongoose.model("users",UserSchema);

module.exports = User;