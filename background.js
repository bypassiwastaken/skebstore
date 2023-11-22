const INSTALLER_PATH = "/installer.html"

async function openInstaller() {
  let currentWindow = await chrome.windows.getCurrent()
  chrome.tabs.create({
    url: INSTALLER_PATH,
    windowId: currentWindow.id,
  });
}

chrome.runtime.onInstalled.addListener(openInstaller);
chrome.action.onClicked.addListener(openInstaller)