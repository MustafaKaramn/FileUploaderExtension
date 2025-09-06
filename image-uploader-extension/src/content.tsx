import React from 'react';
import ReactDOM from 'react-dom/client';
import { ImagePreviewPopup } from './components/ImagePreviewPopup';

console.log("Chat Resim Yükleyici Eklentisi Aktif! (React Version)");

// Gerekli bilgileri ve olay dinleyicilerini tanımlayalım
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const TARGET_SELECTORS = [
    { name: 'YouTube', selector: 'yt-live-chat-text-input-field-renderer #input' },
    { name: 'Kick', selector: '#chat-input-wrapper div[data-input="true"]' },
    { name: 'Twitch', selector: 'div[data-a-target="chat-input"]' }
];

function handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).style.outline = '2px dashed #3b82f6';
}

function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).style.outline = 'none';
}

function handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).style.outline = 'none';

    const file = e.dataTransfer?.files?.[0];

    if (file && ALLOWED_TYPES.includes(file.type)) {
        const imageUrl = URL.createObjectURL(file);
        
        // --- React Component'ini Sayfaya Enjekte Etme ---
        
        // Önceki popup'ı (varsa) kaldır
        const existingRoot = document.getElementById('react-image-preview-root');
        if (existingRoot) existingRoot.remove();

        // React uygulamamız için bir container oluştur
        const appContainer = document.createElement('div');
        appContainer.id = 'react-image-preview-root';
        document.body.appendChild(appContainer);

        const root = ReactDOM.createRoot(appContainer);
        
        const onUpload = (storageDays: number) => {
          console.log(`Dosya ${storageDays} gün depolama seçeneği ile yüklenecek!`);
          // Burada gerçek yükleme işleminizi yapacaksınız.
        };

        const onClose = () => {
          root.unmount();
          appContainer.remove();
        };

        root.render(
          <React.StrictMode>
            <ImagePreviewPopup imageUrl={imageUrl} onClose={onClose} onUpload={onUpload} />
          </React.StrictMode>
        );

    } else {
        alert("Hata: Yalnızca resim dosyaları kabul edilir!");
    }
}

// Ana Mantık: Elementleri Bul ve Dinleyicileri Ekle
function initializeDragDrop() {
    TARGET_SELECTORS.forEach(target => {
        const element = document.querySelector(target.selector) as HTMLElement;

        if (element && !element.dataset.dragListenerAttached) {
            console.log(`${target.name} chat input'u bulundu, dinleyiciler ekleniyor.`);
            element.dataset.dragListenerAttached = 'true';

            element.addEventListener('dragover', handleDragOver);
            element.addEventListener('dragleave', handleDragLeave);
            element.addEventListener('drop', handleDrop);
        }
    });
}

setInterval(initializeDragDrop, 1000);