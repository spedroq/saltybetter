chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'developer.chrome.com' },
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostContains: '.saltybet.com' },
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

// chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
//   console.log("Received %o from %o, frame", msg, sender.tab, sender.frameId);
//   let balanceLabelElement = document.getElementById('balance-label');
//   balanceLabelElement.innerText = msg
//   sendResponse("Gotcha!");
// });

chrome.extension.onRequest.addListener(function(request, sender) {
  console.log('onRequest:', request.message);
});