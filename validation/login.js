const validator = require('validator');
const isEmpty = require('./is-empty');

const validateLoginData = (data) => {
  let result = {
    msg:'',
    isValid:true
  }
  let {email,password} = data;
    // TODO:这里代码需要优化
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
  return result;
}

module.exports = {
    validateLoginData
}