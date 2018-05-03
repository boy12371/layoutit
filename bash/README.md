# CentOS7 使用 pm2 守护进程自启动

1.  将 node 链接至/usr/bin 目录

```bash
ln -s /usr/bin/node /usr/node/bin/node
```

2.  启动 node.js 应用

```bash
npm i pm2 -g
cd ~/stcpd-dist
pm2 start pm2.simple.config.js --env production
```

3.  保存脚本

```bash
pm2 save
```

4.  创建开机启动脚本

```bash
pm2 startup systemd
```

5.  重启服务器测试

```bash
reboot
```

6.  查看启动状态

```bash
systemctl status pm2-root.service
```

7.  删除 pm2 服务

```bash
pm2 unstartup systemd
```

说明：如果您需要启动多个服务，需要多次运行步骤 2 即可（建议 app.js 改成绝对路径，加上–name 参数，或者改成不同的名字，比如 server.js,server1.js）
