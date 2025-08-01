# 库存销售管理系统

一个基于Web的库存管理系统，支持云端存储和实时同步。

## 功能特性

- 📦 库存信息管理
- 🛒 采购记录跟踪
- 📊 销售数据分析
- ⚠️ 低库存警告
- 📈 数据可视化图表
- ☁️ 云端数据同步（Supabase）
- 📱 响应式设计
- 🔄 离线支持

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **UI框架**: Tailwind CSS
- **图表库**: Chart.js
- **云端存储**: Supabase
- **部署平台**: Netlify

## 快速开始

### 1. Supabase配置

1. 访问 [Supabase](https://supabase.com) 并创建新项目
2. 在项目仪表板中，找到API设置
3. 复制项目URL和匿名密钥
4. 在 `index.html` 中更新以下配置：

```javascript
// 替换为你的Supabase配置
const SUPABASE_URL = 'https://your-project-ref.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

### 2. 数据库设置

在Supabase SQL编辑器中执行以下SQL创建数据表：

```sql
-- 创建库存数据表
CREATE TABLE inventory_data (
  id INTEGER PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL DEFAULT '[]'::jsonb,
  images JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用行级安全策略
ALTER TABLE inventory_data ENABLE ROW LEVEL SECURITY;

-- 创建策略允许所有操作（开发环境）
CREATE POLICY "Allow all operations" ON inventory_data
  FOR ALL USING (true) WITH CHECK (true);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_inventory_data_updated_at
    BEFORE UPDATE ON inventory_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 3. Netlify部署

#### 方法一：Git部署（推荐）

1. 将代码推送到GitHub仓库
2. 登录 [Netlify](https://netlify.com)
3. 点击 "New site from Git"
4. 选择你的GitHub仓库
5. 设置构建配置：
   - Build command: `echo 'No build required'`
   - Publish directory: `.`
6. 点击 "Deploy site"

#### 方法二：拖拽部署

1. 将整个 `Estoque2` 文件夹压缩为ZIP文件
2. 登录 [Netlify](https://netlify.com)
3. 将ZIP文件拖拽到Netlify部署区域

### 4. 环境变量配置（可选）

为了安全起见，可以将Supabase配置设置为环境变量：

1. 在Netlify项目设置中，找到 "Environment variables"
2. 添加以下变量：
   - `SUPABASE_URL`: 你的Supabase项目URL
   - `SUPABASE_ANON_KEY`: 你的Supabase匿名密钥

然后修改 `index.html` 中的配置：

```javascript
// 使用环境变量（需要构建步骤）
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://your-project-ref.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'your-anon-key';
```

## 使用说明

### 数据导入

- **Excel导入**: 点击顶部工具栏的"导入Excel"按钮
- **PDF处理**: 上传PDF文件自动提取产品信息
- **图片上传**: 批量上传产品图片文件夹

### 数据同步

- 系统会自动与云端同步数据
- 支持离线使用，数据存储在本地
- 网络恢复后自动同步到云端

### 数据备份

- 点击"备份"按钮导出JSON格式的备份文件
- 使用"恢复"功能导入备份数据

## 安全注意事项

1. **生产环境**: 请设置适当的Supabase行级安全策略
2. **API密钥**: 不要在公共仓库中暴露真实的API密钥
3. **访问控制**: 考虑添加用户认证系统

## 故障排除

### 常见问题

1. **同步失败**
   - 检查网络连接
   - 验证Supabase配置是否正确
   - 查看浏览器控制台错误信息

2. **数据丢失**
   - 系统会自动保存到本地存储
   - 使用备份功能定期备份数据

3. **图片不显示**
   - 确保图片文件名与产品名称匹配
   - 检查图片格式是否支持

## 开发

### 本地开发

```bash
# 启动本地服务器
python -m http.server 8000

# 或使用Node.js
npx serve .
```

### 自定义

- 修改 `tailwind.config` 自定义主题
- 编辑CSS变量调整颜色方案
- 扩展JavaScript功能

## 许可证

MIT License

## 支持

如有问题或建议，请创建Issue或联系开发者。