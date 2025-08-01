// Supabase配置示例文件
// 复制此文件为 config.js 并填入你的实际配置

// 1. 访问 https://supabase.com 创建新项目
// 2. 在项目设置 > API 中找到以下信息
// 3. 将下面的占位符替换为实际值

const SUPABASE_CONFIG = {
  url: 'https://your-project-ref.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key'
};

// 导出配置（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SUPABASE_CONFIG;
}

// 全局变量（用于直接在HTML中引用）
if (typeof window !== 'undefined') {
  window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}