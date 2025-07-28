import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// 解决ES模块中__dirname未定义的问题
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// 托管静态文件
app.use(express.static(path.join(__dirname)));

// 路由设置
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
  console.log("使用 Ctrl+C 停止服务器");
});
