
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o botão de alternância do modo noturno
    const toggleSwitch = document.getElementById('toggle-night-mode');

    // Carrega o estado do modo noturno a partir do armazenamento local
    chrome.storage.local.get('nightModeEnabled', function (data) {
        // Se a chave 'nightModeEnabled' existir, define o estado do toggle
        if (typeof data.nightModeEnabled !== 'undefined') {
            toggleSwitch.checked = data.nightModeEnabled;
        } else {
            // Define como desabilitado (false) se não houver valor armazenado
            toggleSwitch.checked = false;
        }
    });

    // Adiciona um listener para o botão de alternância
    toggleSwitch.addEventListener('change', function () {
        const isEnabled = toggleSwitch.checked;

        // Envia uma mensagem para o background.js para atualizar o estado do modo noturno
        chrome.runtime.sendMessage({
            action: 'toggleNightMode',
            enabled: isEnabled
        }, function (response) {
            if (chrome.runtime.lastError) {
                console.error('Erro ao enviar mensagem:', chrome.runtime.lastError);
            } else {
                console.log('Resposta recebida:', response.status);
            }
        });

        // Atualiza o estado no armazenamento local
        chrome.storage.local.set({ nightModeEnabled: isEnabled }, function () {
            console.log('Modo noturno atualizado para:', isEnabled);
        });
    });
});
