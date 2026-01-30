// 要监控的API列表
const apiEndpoints = [
  {
    name: "GitHub API",
    url: "https://api.github.com",
    method: "GET",
    headers: {
      "User-Agent": "API-Monitor"
    },
    timeout: 5000
  },
  {
    name: "JSONPlaceholder",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    method: "GET",
    timeout: 10000
  },
  {
    name: "Public API",
    url: "https://api.publicapis.org/entries",
    method: "GET",
    timeout: 8000
  }
];

// 请求配置
const config = {
  retryAttempts: 3,
  retryDelay: 1000,
  timeout: 10000,
  logToFile: true
};

module.exports = {
  apiEndpoints,
  config
};
