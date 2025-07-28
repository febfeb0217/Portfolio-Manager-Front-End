import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// import mysql from "mysql2/promise";

// 解决ES模块中__dirname未定义的问题
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5173;

// 创建数据库连接池
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "sigrid123",
//   database: "portfolio_manager"
// });

// 托管静态文件
app.use(express.static(path.join(__dirname, "")));

// 路由设置
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/index.html"));
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
  console.log("使用 Ctrl+C 停止服务器");
});
