function applyNightMode() {
    document.documentElement.classList.add('night-mode');
}

function removeNightMode() {
    document.documentElement.classList.remove('night-mode');
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'toggleNightMode') {
        if (message.enabled) {
            applyNightMode();
        } else {
            removeNightMode();
        }
        sendResponse({ status: 'Night mode toggled' });
    }
});

chrome.storage.local.get('nightModeEnabled', function(result) {
    if (result.nightModeEnabled) {
        applyNightMode();
    }
});
