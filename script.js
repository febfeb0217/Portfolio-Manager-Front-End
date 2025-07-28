// 通用导航函数
function navigateTo(page) {
  window.location.href = page;
}

// 跳转到登录页
function goToLogin() {
  navigateTo("login.html");
}

// 跳转到首页
function goToHome() {
  navigateTo("index.html");
}

// 登录页：自动填充 Demo 账号
function autoFillDemo() {
  document.getElementById("username").value = "demo";
  document.getElementById("password").value = "demo";
}

// 登录页：模拟登录（实际需结合后端，这里仅跳转演示）
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // 简单校验（可扩展真实逻辑）
    if (username === "demo" && password === "demo") {
      alert("登录成功！即将跳转主页");
      window.location.href = "index.html";
    } else {
      alert("用户名或密码错误，请使用 demo/demo 尝试");
    }
  });
}
