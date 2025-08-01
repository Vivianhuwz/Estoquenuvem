// Supabase配置文件
// 请将以下配置替换为您的实际Supabase项目配置

// 1. 访问 https://supabase.com 创建新项目
// 2. 在项目设置 > API 中找到以下信息
// 3. 将下面的占位符替换为实际值

const SUPABASE_CONFIG = {
  url: 'https://wbkamcvugvyhgiaxidqb.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6India2FtY3Z1Z3Z5aGdpYXhpZHFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwODg1NDUsImV4cCI6MjA2OTY2NDU0NX0.pmGQOCtbfQjAjDV9ZsqV2a7ver8oovDmo8GP9meOxLA'
}

// 注意：以上是示例配置，请替换为您的真实Supabase项目配置
// 如果您还没有Supabase项目，系统将仅使用本地存储功能

// 导出配置（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SUPABASE_CONFIG;
}

// 全局变量（用于直接在HTML中引用）
if (typeof window !== 'undefined') {
  window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}