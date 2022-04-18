```bash
# 全局安装lerna
$ npm install lerna -g
       
# 默认初始化lerna框架
$ lerna init 
       
# 创建文件夹并初始化
$ lerna create demo1 

# 列出下次发版lerna publish 要更新的包
$ lerna changed

# 打tag，传git，传npm
$ lerna publish

# 两个包有所关联
$ lerna link

# 抽离公共模块
$ lerna bootstrap --hoist
```