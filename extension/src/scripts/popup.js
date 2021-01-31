const bet500 = document.getElementById('bet-500');
const bet1000 = document.getElementById('bet-1000');
const bet2000 = document.getElementById('bet-2000');

bet500.onclick = function(element) {
    console.log('Clicked the 500 button');
    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                rules: [
                    {
                        betAmountLimit: 700,
                        betAmount: 500
                    }
                ]
            },
            function(response) {
                console.log(response);
            }
        );
    });
}

bet1000.onclick = function(element) {
    console.log('Clicked the 1000 button');
    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                rules: [
                    {
                        betAmountLimit: 1500,
                        betAmount: 1000
                    }
                ]
            },
            function(response) {
                console.log(response);
            }
        );
    });
}

bet2000.onclick = function(element) {
    console.log('Clicked the 2000 button');
    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                rules: [
                    {
                        betAmountLimit: 1500,
                        betAmount: 1000
                    },
                    {
                        betAmountLimit: 2500,
                        betAmount: 2000
                    }
                ]
            },
            function(response) {
                console.log(response);
            }
        );
    });
}