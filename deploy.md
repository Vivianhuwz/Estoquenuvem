# 部署指南

## 快速部署到Netlify

### 方法一：拖拽部署（最简单）

1. **准备文件**
   - 确保已配置好Supabase（参考README.md）
   - 将整个 `Estoque2` 文件夹压缩为ZIP文件

2. **部署到Netlify**
   - 访问 [netlify.com](https://netlify.com)
   - 注册/登录账户
   - 将ZIP文件拖拽到部署区域
   - 等待部署完成

3. **配置自定义域名（可选）**
   - 在Netlify项目设置中添加自定义域名
   - 配置DNS记录

### 方法二：Git部署（推荐）

1. **创建Git仓库**
   ```bash
   cd Estoque2
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **推送到GitHub**
   ```bash
   # 在GitHub创建新仓库后
   git remote add origin https://github.com/yourusername/inventory-system.git
   git branch -M main
   git push -u origin main
   ```

3. **连接Netlify**
   - 在Netlify选择 "New site from Git"
   - 选择GitHub仓库
   - 配置构建设置：
     - Build command: `echo 'Static site - no build required'`
     - Publish directory: `.`
   - 点击 "Deploy site"

### 方法三：Netlify CLI部署

1. **安装Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **登录Netlify**
   ```bash
   netlify login
   ```

3. **部署**
   ```bash
   cd Estoque2
   netlify deploy --prod --dir .
   ```

## 环境配置

### Supabase配置

1. **获取Supabase凭据**
   - 登录 [supabase.com](https://supabase.com)
   - 创建新项目或选择现有项目
   - 在项目设置 > API 中找到：
     - Project URL
     - Anon public key

2. **更新配置**
   在 `index.html` 中找到并更新：
   ```javascript
   const SUPABASE_URL = 'https://your-project-ref.supabase.co';
   const SUPABASE_ANON_KEY = 'your-anon-key';
   ```

3. **初始化数据库**
   - 在Supabase SQL编辑器中执行 `supabase-setup.sql`
   - 验证表创建成功

### 环境变量（高级）

如果使用构建流程，可以设置环境变量：

1. **在Netlify中设置**
   - 项目设置 > Environment variables
   - 添加：
     - `SUPABASE_URL`
     - `SUPABASE_ANON_KEY`

2. **修改代码使用环境变量**
   ```javascript
   const SUPABASE_URL = process.env.SUPABASE_URL || 'fallback-url';
   const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'fallback-key';
   ```

## 部署后验证

### 功能测试清单

- [ ] 页面正常加载
- [ ] Supabase连接成功
- [ ] 数据同步功能正常
- [ ] Excel导入功能
- [ ] 图片上传功能
- [ ] 数据备份/恢复
- [ ] 响应式设计在移动设备上正常

### 性能优化

1. **启用Netlify优化**
   - Asset optimization
   - Pretty URLs
   - HTTPS

2. **配置缓存**
   - 已在 `netlify.toml` 中配置
   - 静态资源长期缓存
   - HTML文件不缓存

## 故障排除

### 常见问题

1. **部署失败**
   - 检查文件结构
   - 确保 `index.html` 在根目录
   - 查看Netlify部署日志

2. **Supabase连接失败**
   - 验证URL和密钥正确性
   - 检查网络连接
   - 查看浏览器控制台错误

3. **功能异常**
   - 清除浏览器缓存
   - 检查JavaScript错误
   - 验证Supabase表结构

### 调试技巧

1. **查看部署日志**
   ```bash
   netlify logs
   ```

2. **本地测试**
   ```bash
   # 使用Python
   python -m http.server 8000
   
   # 使用Node.js
   npx serve .
   
   # 使用Netlify Dev
   netlify dev
   ```

3. **检查网络请求**
   - 打开浏览器开发者工具
   - 查看Network标签
   - 检查API请求状态

## 安全建议

### 生产环境

1. **Supabase安全**
   - 设置适当的RLS策略
   - 限制API访问权限
   - 启用用户认证（如需要）

2. **Netlify安全**
   - 启用HTTPS
   - 配置安全头
   - 设置访问控制（如需要）

3. **数据保护**
   - 定期备份数据
   - 监控异常访问
   - 实施数据加密

## 维护

### 定期任务

- 检查Supabase使用量
- 更新依赖库版本
- 监控网站性能
- 备份重要数据

### 更新流程

1. **Git部署**
   ```bash
   git add .
   git commit -m "Update description"
   git push origin main
   ```
   Netlify会自动重新部署

2. **手动部署**
   - 重新上传文件到Netlify
   - 或使用Netlify CLI重新部署

---

**需要帮助？**
- 查看 [Netlify文档](https://docs.netlify.com)
- 查看 [Supabase文档](https://supabase.com/docs)
- 创建GitHub Issue报告问题