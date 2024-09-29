const { app, BrowserWindow, Menu } = require('electron'); // Ensure Menu is imported
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: !app.isPackaged, // Disable DevTools in production
    },
  });

  // Load your HTML file
  mainWindow.loadFile('index.html');

  if (app.isPackaged) {
    // Disable menu and DevTools in production
    Menu.setApplicationMenu(null);  // Completely remove the menu
    mainWindow.setMenuBarVisibility(false); // Hide menu bar
    mainWindow.setAutoHideMenuBar(true); // Auto-hide menu bar
  } else {
    // Optionally open DevTools in development
    mainWindow.webContents.openDevTools();
  }

  // Hide the mouse pointer using JavaScript in the renderer process
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.executeJavaScript(`
      document.body.style.cursor = 'none'; // Hide the mouse pointer
    `);
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
