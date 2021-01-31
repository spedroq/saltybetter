let bet1000 = document.getElementById('bet-1000');
let bet500 = document.getElementById('bet-500');

bet500.onclick = function(element) {
    console.log('Clicked the 500 button');
    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {betAmount: 500}, function(response) {
            console.log(response);
        });
    });
}

bet1000.onclick = function(element) {
    console.log('Clicked the 1000 button');
    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {betAmount: 1000}, function(response) {
            console.log(response);
        });
    });
}