const express = require('express');
const compression = require('compression');

const app = express();

// GZIP压缩中间件 一定要放在 静态资源中间件 前面，否则不生效
// 在网络传输时，会对资源进行压缩传输，减少传输流量
app.use(compression());

app.use(express.static('./dist'));

// 默认端口80，可以省略不写
app.listen(80, () => {
  console.log('app started at http://localhost');
});
