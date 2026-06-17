// HF Space 保活
const apiEndpoints = [
  {
    name: "OpenClaw Space",
    url: "https://zh568972743-openclaw.hf.space/chat?session=agent%3Amain%3Amain",
    method: "GET",
    headers: { "User-Agent": "API-Monitor" },
    timeout: 10000
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
