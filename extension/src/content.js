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
    console.log('here')
    if(request) {
        console.log('request:', request);
        const dataDiv = document.createElement('div');
        console.log('dataDiv:', dataDiv)
        dataDiv.setAttribute("id", "salty-better-configuration");
        dataDiv.setAttribute("configuration", JSON.stringify(request))
        console.log('dataDiv:', dataDiv)
        const body = document.body || document.getElementsByTagName("body")[0] || document.documentElement;
        console.log('body:', body)
        body.insertBefore(dataDiv, body.lastChild);
        console.log('body:', body.lastChild)
    }
    sendResponse('Set configuration')
});
