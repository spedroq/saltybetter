let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

// changeColor.onclick = function(element) {
//     // Run the better script
//     // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     //     chrome.tabs.executeScript(
//     //         tabs[0].id,
//     //         {file: "./better.js"});
//     // });

//     // let color = element.target.value;
//     // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     //     chrome.tabs.executeScript(
//     //         tabs[0].id,
//     //         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//     // });

// }