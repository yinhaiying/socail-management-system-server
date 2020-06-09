const validator = require('validator');
const isEmpty = require('./is-empty');

const validateRegisterData = (data) => {
  let result = {
    msg:'',
    isValid:true
  }
  let {username,password,email} = data;
// TODO:这里代码需要优化
  if(validator.isEmpty(username)){
    result.msg = "用户名不能为空";
    result.isValid = false;
    return result
  }
  if(!validator.isLength(username,{min:2,max:30})){
    result.msg = "用户名的长度不能小于2位且不能超过30位";
    result.isValid = false;
    return result;
  }
  if(validator.isEmpty(email)){
    result.msg = "邮箱不能为空";
    result.isValid = false;
    return result
  }
  if(validator.isEmpty(password)){
    result.msg = "密码不能为空";
    result.isValid = false;
    return result;
  }

  if(!validator.isLength(password,{min:6,max:30})){
    result.msg = "密码长度不能小于6位且不能超过30位";
    result.isValid = false;
    return result;
  }
  if(!validator.isEmail(email)){
    result.msg = "邮箱不合法";
    result.isValid = false;
    return result;
  }
  return result;
}

module.exports = {
    validateRegisterData
}