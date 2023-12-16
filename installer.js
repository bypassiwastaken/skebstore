const manifest = {
  "manifest_version": 3,
  "name": "Your Extension",
  "permissions": ["storage", "activeTab", "downloads", "webNavigation"],
  "version": "1.0.0"
};

function installId(id) {
  return new Promise(async (resolve, reject) => {
    try {
      await chrome.webstorePrivate.beginInstallWithManifest3({
        id: id,
        manifest: JSON.stringify(manifest)
      });
      await chrome.webstorePrivate.completeInstall(id, resolve);
    } catch (error) {
      if (error.message.includes("Invalid extension ID")) {
        reject("Please enter a valid extension ID.");
      } else {
        reject("An error occurred during installation.");
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('button');
  const input = document.querySelector('input');
  const error = document.querySelector('.error');

  button.addEventListener('click', async () => {
    try {
      await installId(input.value);
      error.textContent = '';
    } catch (err) {
      error.textContent = err;
    }
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      button.click();
    }
  });
});
