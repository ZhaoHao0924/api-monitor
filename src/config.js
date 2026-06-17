// HF Space 保活
const apiEndpoints = [
  {
    name: "OpenClaw Space",
    url: "https://zh568972743-openclaw.hf.space",
    method: "GET",
    headers: { "User-Agent": "API-Monitor"
               "Cookie": "spaces-jwt=eyJhbGciOiJFZERTQSIsImtpZCI6Im1sR1pFYktIVHRVSGRhX1RRdEczQ0N1S3k5ME9Qd25DNHY5elRjM3FVYzgifQ.eyJyZWFkIjp0cnVlLCJwZXJtaXNzaW9ucyI6eyJyZXBvLmNvbnRlbnQucmVhZCI6dHJ1ZX0sIm9uQmVoYWxmT2YiOnsia2luZCI6InVzZXIiLCJfaWQiOiI2OWMxZjNmODAyNTE1ZWIyMjQ1ODRhYzAiLCJ1c2VyIjoiemg1Njg5NzI3NDMiLCJzZXNzaW9uSWQiOiI2YTMxZjU1ZWFiMDllMWFiNmNhMzY0NzQifSwiaWF0IjoxNzgxNjg0NjE3LCJqdGkiOiI2OGU4OWI2YS1kOWVlLTQwNmUtOTMyOC1mYzQ4ZDliNTQ3YmMiLCJzdWIiOiIvc3BhY2VzL3poNTY4OTcyNzQzL29wZW5DbGF3IiwiZXhwIjoxNzgxNzcxMDE3LCJpc3MiOiJodHRwczovL2h1Z2dpbmdmYWNlLmNvIn0.zQHvnZdGDbM-h7Jqeh4p-TpCFgROCVMc2kJyZqr0CX0SzAHaUKN-oZFE3P1TzCBoGT0BRml2yAsiKvNRP9EkBw" },
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
