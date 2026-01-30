const axios = require('axios');
const logger = require('./utils/logger');
const { apiEndpoints, config } = require('./config');

class APIMonitor {
  constructor() {
    this.results = [];
  }

  async testEndpoint(endpoint, attempt = 1) {
    const startTime = Date.now();
    
    try {
      const response = await axios({
        url: endpoint.url,
        method: endpoint.method || 'GET',
        headers: endpoint.headers,
        timeout: endpoint.timeout || config.timeout
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      const result = {
        name: endpoint.name,
        url: endpoint.url,
        status: response.status,
        statusText: response.statusText,
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString(),
        success: true,
        data: endpoint.logResponse ? response.data : undefined
      };

      logger.info(`✅ ${endpoint.name}: ${response.status} (${responseTime}ms)`);
      return result;

    } catch (error) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // 重试逻辑
      if (attempt < config.retryAttempts) {
        logger.warn(`🔄 ${endpoint.name}: 重试中 (${attempt}/${config.retryAttempts})`);
        await new Promise(resolve => setTimeout(resolve, config.retryDelay));
        return this.testEndpoint(endpoint, attempt + 1);
      }

      const result = {
        name: endpoint.name,
        url: endpoint.url,
        status: error.response ? error.response.status : 'Error',
        statusText: error.message,
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString(),
        success: false,
        error: error.message
      };

      logger.error(`❌ ${endpoint.name}: ${error.message}`);
      return result;
    }
  }

  async runAllTests() {
    logger.info('🚀 开始测试所有API端点...');
    this.results = [];

    for (const endpoint of apiEndpoints) {
      try {
        const result = await this.testEndpoint(endpoint);
        this.results.push(result);
        
        // 延迟一下，避免请求过于密集
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        logger.error(`测试 ${endpoint.name} 时发生错误:`, error);
      }
    }

    this.generateReport();
    return this.results;
  }

  generateReport() {
    const successful = this.results.filter(r => r.success).length;
    const failed = this.results.filter(r => !r.success).length;
    const totalTime = this.results.reduce((sum, r) => {
      const time = parseInt(r.responseTime) || 0;
      return sum + time;
    }, 0);
    const avgTime = totalTime / this.results.length;

    logger.info('📊 ========== 测试报告 ==========');
    logger.info(`📈 总测试数: ${this.results.length}`);
    logger.info(`✅ 成功: ${successful}`);
    logger.info(`❌ 失败: ${failed}`);
    logger.info(`⏱️  平均响应时间: ${avgTime.toFixed(2)}ms`);
    logger.info('📅 完成时间: ' + new Date().toISOString());
    logger.info('================================');

    // 输出详细结果
    this.results.forEach(result => {
      const emoji = result.success ? '✅' : '❌';
      logger.info(`${emoji} ${result.name}: ${result.status} - ${result.responseTime}`);
    });
  }
}

// 如果直接运行此文件
if (require.main === module) {
  const monitor = new APIMonitor();
  monitor.runAllTests().catch(console.error);
}

module.exports = APIMonitor;
