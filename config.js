// Supabase配置
// 请在部署前替换为您的实际Supabase项目配置
const defaultSupabaseConfig = {
  url: 'https://wbkamcvugvyhgiaxidqb.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6India2FtY3Z1Z3Z5aGdpYXhpZHFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwODg1NDUsImV4cCI6MjA2OTY2NDU0NX0.pmGQOCtbfQjAjDV9ZsqV2a7ver8oovDmo8GP9meOxLA'
};

const storedSupabaseUrl = localStorage.getItem('CLOUD_SUPABASE_URL');
const storedSupabaseAnonKey = localStorage.getItem('CLOUD_SUPABASE_ANON_KEY');

window.SUPABASE_CONFIG = {
  url: storedSupabaseUrl || defaultSupabaseConfig.url,
  anonKey: storedSupabaseAnonKey || defaultSupabaseConfig.anonKey
};

window.CLOUD_CONFIG = {
  provider: localStorage.getItem('CLOUD_PROVIDER') || 'supabase'
};

window.setSupabaseConfig = function (url, anonKey) {
  if (typeof url === 'string' && url.trim()) {
    localStorage.setItem('CLOUD_SUPABASE_URL', url.trim());
  }
  if (typeof anonKey === 'string' && anonKey.trim()) {
    localStorage.setItem('CLOUD_SUPABASE_ANON_KEY', anonKey.trim());
  }
  localStorage.setItem('CLOUD_PROVIDER', 'supabase');
  window.location.reload();
};

window.disableCloudSync = function () {
  localStorage.setItem('CLOUD_PROVIDER', 'none');
  window.location.reload();
};

window.enableNeonSync = function (syncToken) {
  if (typeof syncToken === 'string' && syncToken.trim()) {
    localStorage.setItem('CLOUD_SYNC_TOKEN', syncToken.trim());
  }
  localStorage.setItem('CLOUD_PROVIDER', 'neon');
  window.location.reload();
};

window.clearCloudConfig = function () {
  localStorage.removeItem('CLOUD_SUPABASE_URL');
  localStorage.removeItem('CLOUD_SUPABASE_ANON_KEY');
  localStorage.removeItem('CLOUD_PROVIDER');
  localStorage.removeItem('CLOUD_SYNC_TOKEN');
  window.location.reload();
};

// 如果您使用环境变量（推荐用于生产环境），可以这样配置：
// window.SUPABASE_CONFIG = {
//   url: process.env.REACT_APP_SUPABASE_URL || 'https://your-project-ref.supabase.co',
//   anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key-here'
// };

// 注意：在生产环境中，建议使用环境变量来存储敏感信息
// 在Netlify中，您可以在站点设置的Environment variables中设置这些值
