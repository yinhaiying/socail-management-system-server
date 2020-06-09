const bcrypt = require('bcrypt');

const tools = {
    enbcrypt(password){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash
    },
    validate(params){
      let obj = {
          result:true,
          msg:''
      }
      for(let i = 0;i < params.length;i++){
          const item = params[i];
          const {value,msg} = item;
          if(!value){
              obj.result = false;
              obj.msg = msg;
              break;
          }
      }
      return obj;
    }
}



module.exports = {
    tools
}