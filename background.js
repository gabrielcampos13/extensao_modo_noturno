// Gerencia o estado global do modo noturno
let nightModeEnabled = false;

function updateNightModeState(enabled) {
    nightModeEnabled = enabled;

    // Envia mensagem para todos os content scripts em todas as abas abertas
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
            chrome.tabs.sendMessage(tab.id, { action: 'toggleNightMode', enabled: nightModeEnabled });
        });
    });

    // Salva o estado no armazenamento local
    chrome.storage.local.set({ nightModeEnabled: nightModeEnabled });
}

// Ouve mensagens vindas do popup.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'toggleNightMode') {
        updateNightModeState(message.enabled);
        sendResponse({ status: 'Night Mode updated' });
    }
});

// Carrega o estado do modo noturno ao iniciar a extensão
chrome.storage.local.get('nightModeEnabled', function(result) {
    if (result.nightModeEnabled !== undefined) {
        updateNightModeState(result.nightModeEnabled);
    }
});
