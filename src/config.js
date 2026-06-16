// 要监控的端点列表（包含HF Space保活 + API监控）
const apiEndpoints = [
  // === HF Space 保活 ===
  {
    name: "OpenClaw Space (保活)",
    url: "https://zh568972743-openclaw.hf.space/",
    method: "GET",
    headers: { "User-Agent": "API-Monitor" },
    timeout: 10000
  },
  // === API 监控 ===
  {
    name: "memos API",
    url: "https://zhhyt568972743-memos.hf.space/",
    method: "GET",
    headers: { "User-Agent": "API-Monitor" },
    timeout: 5000
  },
  {
    name: "wxpush API",
    url: "https://zhhyt568972743-wxpush.hf.space/",
    method: "GET",
    headers: { "User-Agent": "API-Monitor" },
    timeout: 5000
  },
  {
    name: "kvideo API",
    url: "https://zhhyt568972743-kvideo.hf.space/",
    method: "GET",
    headers: { "User-Agent": "API-Monitor" },
    timeout: 5000
  },
  {
    name: "qinglong API",
    url: "https://zhhyt568972743-qinglong.hf.space/",
    method: "GET",
    headers: { "User-Agent": "API-Monitor" },
    timeout: 5000
  }
];

// 请求配置
const config = {
  retryAttempts: 3,
  retryDelay: 1000,
  timeout: 10000
};

module.exports = {
  apiEndpoints,
  config
};
