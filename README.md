# socail-management-system-server
社交管理系统后端接口





## 打包上传
使用heroku进行打包上传
1. [注册账号](https://dashboard.heroku.com/apps)
2. [安装heroku cli](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
3. 修改端口
```javascript
const port = process.env.PORT || 5000;
```
线上端口需要通过process.env.PORT自动获取。
4. 进入项目中使用heroku进行登录
```javascript
C:\Users\xxxx\Desktop\my-program\socail-management-system-server>heroku login
heroku: Press any key to open up the browser to login or q to exit:
Opening browser to https://cli-auth.heroku.com/auth/cli/browser/6b5ec5c9-b813-44e7-b478-15d88bb539eb
Logging in... done
Logged in as xxx@gmail.com
```
5. 登录成功后，使用heroku创建一个项目
```javascript
C:\Users\xxx\Desktop\my-program\socail-management-system-server>heroku create social-system-server
Creating ⬢ social-system-server... done
https://social-system-server.herokuapp.com/ | https://git.heroku.com/social-system-server.git
```
6. 开始上传
进入heroku，找到对应的项目，然后找到delopy菜单栏
```javascript
1. 登录
$ heroku login

2. 连接heroku
$ cd my-project/
$ git init
$ heroku git:remote -a social-system-server

3. 上传deploy
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```
如果是一个已经存在的项目，只需要：
```javascript
$ heroku git:remote -a social-system-server
```