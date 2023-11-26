const manifest = {
  manifest_version: 2,
  name: "ext",
  version: "0.0.0",
};
const { version: extensionVersion } = chrome.runtime.getManifest();
const ERRORS = {
  TYPE_ERROR: "Expected a 32-character string",
  INVALID_ID: "Invalid extension ID",
  UNKNOWN: "Failed, try again",
};
const HELP_URL = "https://github.com/bypassiwastaken/skebstore";

let help = document.querySelectorAll("svg");

help.addEventListener("click", () => {
  chrome.tabs.create({ url: HELP_URL });
});

function install(id) {
  return new Promise((resolve, reject) => {
    chrome.webstorePrivate.beginInstallWithManifest3(
      {
        id: id,
        manifest: JSON.stringify(manifest),
      },
      () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError.message);
        chrome.webstorePrivate.completeInstall(id, resolve);
      }
    );
  });
}
let button = document.querySelector("button");
let input = document.querySelector("input");
let error = document.querySelector(".error");
let version = document.querySelector(".version");
version.textContent = "v" + extensionVersion;
async function start() {
  let result;
  try {
    result = await install(input.value);
  } catch (err) {
    if (err.startsWith("TypeError")) {
      err = ERRORS.TYPE_ERROR;
    } else if (err.startsWith("Invalid")) {
      err = ERRORS.INVALID_ID;
    } else {
      err = ERRORS.UNKNOWN;
    }
    error.textContent = err;
  }
}

button.addEventListener("click", start);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    button.click();
  }
});
