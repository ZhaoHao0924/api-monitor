# API Monitor

一个使用GitHub Actions定时监控API状态的工具。

## 功能特性

- ✅ 定时监控多个API端点
- ✅ 自动重试失败请求
- ✅ 详细的日志记录
- ✅ 响应时间测量
- ✅ GitHub Actions集成
- ✅ 测试报告生成

## 配置方法

1. 编辑 `src/config.js` 添加你的API端点
2. 配置 `.github/workflows/call-api.yml` 中的定时任务
3. 将代码推送到GitHub

## API端点配置

在 `src/config.js` 中添加：

```javascript
{
  name: "你的API名称",
  url: "https://api.example.com/endpoint",
  method: "GET", // 或 POST, PUT, DELETE
  headers: {
    "Authorization": "Bearer your-token"
  },
  timeout: 5000
}
