let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    // Run the better script
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     chrome.tabs.executeScript(
    //         tabs[0].id,
    //         {file: "./better.js"});
    // });

    // let color = element.target.value;
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     chrome.tabs.executeScript(
    //         tabs[0].id,
    //         {code: 'document.body.style.backgroundColor = "' + color + '";'});
    // });

}

// Setup the betting configuration buttons

let bet1000 = document.getElementById('bet-1000');
let bet500 = document.getElementById('bet-500');

bet500.onclick = function(element) {
    console.log('Clicked the fucking button');
    console.log('chrome:', chrome);
    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {amount: 500}, function(response) {
            console.log(response);
        });
    });

    // chrome.extension.sendMessage({
    //     action: "bet",
    //     amount: 500,
    //     request: 'lelelelelele'
    // }, () => { console.log('some handler for on click sendMessage')});
}

bet1000.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {amount: 500}, function(response) {
            console.log(response);
            return;
        });
    });
    // chrome.extension.sendMessage({
    //     action: "bet",
    //     amount: 1000,
    //     request: 'luuuuuuuuuuuulll'
    // }, () => { console.log('some handler for on click sendMessage')});
}