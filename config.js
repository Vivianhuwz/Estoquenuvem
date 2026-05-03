window.CLOUD_CONFIG = {
  provider: localStorage.getItem('CLOUD_PROVIDER') || 'neon'
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
  localStorage.removeItem('CLOUD_PROVIDER');
  localStorage.removeItem('CLOUD_SYNC_TOKEN');
  window.location.reload();
};
