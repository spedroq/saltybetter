'use strict';

let filePaths = [
    "/src/scripts/main.js"
]

let registerFiles = (path) => {
    const script = document.createElement('script');
    script.setAttribute("type", "module");
    script.setAttribute("src", chrome.extension.getURL(path));
    const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    head.insertBefore(script, head.lastChild);
}

// Register the main file
let i;
for (i = 0; i < filePaths.length; i++) {
    registerFiles(filePaths[0])
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request) {
        const dataDiv = document.createElement('div');
        dataDiv.setAttribute("id", "salty-better-configuration");
        dataDiv.setAttribute("configuration", JSON.stringify(request))
        const body = document.body || document.getElementsByTagName("body")[0] || document.documentElement;
        body.insertBefore(dataDiv, body.lastChild);
    }
    sendResponse('Set configuration')
});
