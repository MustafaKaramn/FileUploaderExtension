console.log("Chat Resim Yükleyici Eklentisi Aktif!");

// 1. Gerekli Bilgileri Tanımlayalım
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

const TARGET_SELECTORS = [
    { name: 'YouTube', selector: 'yt-live-chat-text-input-field-renderer #input' },
    { name: 'Kick', selector: '#chat-input-wrapper div[data-input="true"]' },
    { name: 'Twitch', selector: 'div[data-a-target="chat-input"]' }
];

// 2. Mini Popup'ı Oluşturan Fonksiyon
function createImagePopup(imageUrl: string) {
    // Eğer önceden bir popup varsa onu kaldır
    const existingPopup = document.getElementById('image-preview-popup-by-extension');
    if (existingPopup) {
        existingPopup.remove();
    }

    // Ana popup container'ı
    const popup = document.createElement('div');
    popup.id = 'image-preview-popup-by-extension';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.zIndex = '99999';
    popup.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    popup.style.padding = '20px';
    popup.style.borderRadius = '12px';
    popup.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    popup.style.backdropFilter = 'blur(10px)';
    popup.style.display = 'flex';
    popup.style.flexDirection = 'column';
    popup.style.alignItems = 'center';

    // Resim elemanı
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.maxWidth = '300px';
    img.style.maxHeight = '300px';
    img.style.borderRadius = '8px';

    // Kapatma butonu
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Kapat';
    closeButton.style.marginTop = '15px';
    closeButton.style.padding = '8px 16px';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = '#3b82f6';
    closeButton.style.color = 'white';
    closeButton.style.borderRadius = '8px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = () => popup.remove();

    popup.appendChild(img);
    popup.appendChild(closeButton);
    document.body.appendChild(popup);
}

// 3. Sürükle-Bırak Olaylarını Yöneten Fonksiyonlar
function handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.style.outline = '2px dashed #3b82f6';
}

function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.style.outline = 'none';
}

function handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.style.outline = 'none';

    const file = e.dataTransfer?.files?.[0];

    if (file && ALLOWED_TYPES.includes(file.type)) {
        const imageUrl = URL.createObjectURL(file);
        createImagePopup(imageUrl);
    } else {
        alert("Hata: Yalnızca resim dosyaları kabul edilir!");
    }
}

// 4. Ana Mantık: Elementleri Bul ve Dinleyicileri Ekle
function initializeDragDrop() {
    TARGET_SELECTORS.forEach(target => {
        const element = document.querySelector(target.selector) as HTMLElement;

        if (element && !element.dataset.dragListenerAttached) {
            console.log(`${target.name} chat input'u bulundu, dinleyiciler ekleniyor.`);
            element.dataset.dragListenerAttached = 'true'; // Tekrar eklemeyi önle

            element.addEventListener('dragover', handleDragOver);
            element.addEventListener('dragleave', handleDragLeave);
            element.addEventListener('drop', handleDrop);
        }
    });
}

// Sayfa dinamik olarak yüklendiği için her saniye kontrol edelim
setInterval(initializeDragDrop, 1000);