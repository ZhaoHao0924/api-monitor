const axios = require('axios');
const logger = require('./utils/logger');
const { sendEmail } = require('./utils/mailUtils');
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
    logger.info('🚀 开始测试所有端点...');
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

    // 有失败时发送邮件通知
    if (failed > 0) {
      this.sendAlert(failed, successful);
    }
  }

  async sendAlert(failedCount, successCount) {
    const failedEndpoints = this.results.filter(r => !r.success);
    const failedNames = failedEndpoints.map(r => `- ${r.name}: ${r.statusText}`).join('\n');
    
    const subject = `⚠️ 监控告警 - ${failedCount}个端点失败`;
    const text = `API Monitor 检测报告\n\n总计: ${this.results.length}\n成功: ${successCount}\n失败: ${failedCount}\n\n失败的端点:\n${failedNames}\n\n时间: ${new Date().toISOString()}`;
    const html = `<h2>⚠️ API监控告警</h2><p>总计: ${this.results.length} | 成功: ${successCount} | <strong style="color:red">失败: ${failedCount}</strong></p><h3>失败的端点:</h3><ul>${failedEndpoints.map(r => `<li><strong>${r.name}</strong>: ${r.statusText}</li>`).join('')}</ul><p style="color:#888">时间: ${new Date().toISOString()}</p>`;

    try {
      await sendEmail({
        to: process.env.NOTIFY_EMAIL || '568972743@qq.com',
        subject,
        text,
        html
      });
    } catch (e) {
      logger.error('邮件发送失败:', e.message);
    }
  }
}

// 如果直接运行此文件
if (require.main === module) {
  const monitor = new APIMonitor();
  monitor.runAllTests().catch(console.error);
}

module.exports = APIMonitor;
