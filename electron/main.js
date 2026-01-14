const { app, BrowserWindow } = require('electron');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');

let serverProcess = null;

function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function check() {
      http
        .get(url, () => resolve(url))
        .on('error', () => {
          if (Date.now() - start > timeout) return reject(new Error('Timeout waiting for server'));
          setTimeout(check, 200);
        });
    }
    check();
  });
}

function startNextServer(resourcesPath) {
  const nextBin = path.join(resourcesPath, 'node_modules', 'next', 'dist', 'bin', 'next');
  serverProcess = spawn(process.execPath, [nextBin, 'start', '-p', '3000'], {
    cwd: resourcesPath,
    env: process.env,
    stdio: 'inherit'
  });
  serverProcess.on('error', (err) => console.error('Failed to start next:', err));
  return waitForServer('http://localhost:3000', 30000);
}

function createWindow(loadUrl) {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadURL(loadUrl);
}

app.on('ready', async () => {
  const isDev = !app.isPackaged;
  try {
    if (isDev) {
      await waitForServer('http://localhost:3000', 60000);
      createWindow('http://localhost:3000');
    } else {
      const resourcesPath = path.join(process.resourcesPath, 'app');
      await startNextServer(resourcesPath);
      createWindow('http://localhost:3000');
    }
  } catch (err) {
    console.error('Error starting app:', err);
    app.quit();
  }
});

app.on('before-quit', () => {
  if (serverProcess) {
    try {
      serverProcess.kill();
    } catch (e) {
      // ignore
    }
  }
});

app.on('window-all-closed', () => {
  app.quit();
});
