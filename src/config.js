// 要监控的API列表
const apiEndpoints = [
  {
    name: "memos API",
    url: "https://zhhyt568972743-memos.hf.space/",
    method: "GET",
    headers: {
      "User-Agent": "API-Monitor"
    },
    timeout: 5000
  },
  {
    name: "memos API",
    url: "https://zhhyt568972743-wxpush.hf.space/",
    method: "GET",
    headers: {
      "User-Agent": "API-Monitor"
    },
    timeout: 5000
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
