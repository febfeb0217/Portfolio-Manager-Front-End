// 侧边栏折叠/展开功能
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileOverlay = document.getElementById("mobileOverlay");

// 切换侧边栏状态
function toggleSidebar() {
  sidebar.classList.toggle("collapsed");
  sidebar.classList.toggle("expanded");

  // 切换图标
  const icon = sidebarToggle.querySelector("i");
  if (sidebar.classList.contains("collapsed")) {
    icon.classList.remove("fa-chevron-left");
    icon.classList.add("fa-chevron-right");
  } else {
    icon.classList.remove("fa-chevron-right");
    icon.classList.add("fa-chevron-left");
  }
}

// 移动端菜单控制
function toggleMobileMenu() {
  sidebar.classList.toggle("collapsed");
  sidebar.classList.toggle("expanded");
  mobileOverlay.classList.toggle("active");

  // 切换图标
  const icon = sidebarToggle.querySelector("i");
  if (sidebar.classList.contains("collapsed")) {
    icon.classList.remove("fa-chevron-left");
    icon.classList.add("fa-chevron-right");
  } else {
    icon.classList.remove("fa-chevron-right");
    icon.classList.add("fa-chevron-left");
  }
}

sidebarToggle.addEventListener("click", toggleSidebar);
mobileMenuBtn.addEventListener("click", toggleMobileMenu);
mobileOverlay.addEventListener("click", toggleMobileMenu);

// 隐藏/显示余额功能
const hideBalanceBtn = document.getElementById("hideBalanceBtn");
const balanceElements = document.querySelectorAll(".card-value, .value");

// 保存原始值
balanceElements.forEach((el) => {
  el.setAttribute("data-original", el.textContent);
});

hideBalanceBtn.addEventListener("click", () => {
  const isHidden = hideBalanceBtn
    .querySelector("i")
    .classList.contains("fa-eye");

  balanceElements.forEach((el) => {
    if (isHidden) {
      // 显示余额
      el.textContent = el.getAttribute("data-original");
    } else {
      // 隐藏余额
      el.textContent = "*****";
    }
  });

  // 切换按钮图标和文本
  const icon = hideBalanceBtn.querySelector("i");
  const text = hideBalanceBtn.querySelector("span");

  if (isHidden) {
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
    text.textContent = "Hide Balance";
  } else {
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
    text.textContent = "Show Balance";
  }
});

// 退出登录功能
const signOutLink = document.getElementById("signOutLink");
signOutLink.addEventListener("click", (e) => {
  e.preventDefault();
  if (confirm("Are you sure you want to sign out?")) {
    // 这里可以添加实际的退出登录逻辑
    alert("Signing out...");
    // 示例：跳转到登录页
    // window.location.href = 'login.html';
  }
});

// 响应式处理
function handleResize() {
  if (window.innerWidth >= 769) {
    sidebar.classList.remove("collapsed");
    sidebar.classList.add("expanded");
    mobileOverlay.classList.remove("active");

    const icon = sidebarToggle.querySelector("i");
    icon.classList.remove("fa-chevron-right");
    icon.classList.add("fa-chevron-left");
  } else {
    sidebar.classList.remove("expanded");
    sidebar.classList.add("collapsed");
  }
}

// 初始化时调用一次
handleResize();

// fetch user asset data
async function fetchTotalAsset() {
  try {
    // 后端API地址（假设后端运行在3000端口）
    const response = await fetch("http://localhost:3000/api/user/total-asset");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // 更新页面上的总资产显示
    document.getElementById("totalAssets").textContent = `$${data.total.toFixed(
      2
    )}`;
  } catch (error) {
    console.error("获取总资产失败:", error);
  }
}

async function fetchAssetInfo() {
  try {
    const userId = 1; // 假设用户ID为1，实际应用中应动态获取
    // 后端API地址（假设后端运行在3000端口）
    const cashResponse = await fetch(
      `http://localhost:3000/api/user/${userId}/assets/cash`
    );
    const stockResponse = await fetch(
      `http://localhost:3000/api/user/${userId}/assets/stocks`
    );

    if (!cashResponse.ok || !stockResponse.ok) {
      // 如果需要，可以在这里处理错误，比如显示一个提示信息
      throw new Error("Network response was not ok");
    }

    const cashData = await cashResponse.json();
    const stockData = await stockResponse.json();

    // 更新页面上的总资产显示
    document.getElementById("totalAssets").textContent = `$${(
      Number(cashData.totalCash) + stockData.totalValue
    ).toFixed(2)}`;

    // 更新页面上的现金资产显示
    document.getElementById("cashBalance").textContent = `$${Number(
      cashData.totalCash
    ).toFixed(2)}`;

    // 更新页面上的股票持仓显示
    document.getElementById(
      "stockHoldings"
    ).textContent = `$${stockData.totalValue.toFixed(2)}`;
  } catch (error) {
    console.error("获取资产信息失败:", error);
  }
}

// 页面加载完成后调用

window.addEventListener("DOMContentLoaded", fetchAssetInfo);
// 监听窗口大小变化
window.addEventListener("resize", handleResize);
