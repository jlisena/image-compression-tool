const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,
  env: process.env.NODE_ENV || 'production',
  // placeholder for IPC calls if needed in future
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args)
});
