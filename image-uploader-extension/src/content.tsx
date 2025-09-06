import React from 'react';
import ReactDOM from 'react-dom/client';
import { ImagePreviewPopup } from './components/ImagePreviewPopup';
import { validateFile } from './utils/fileValitation';

console.log("Chat Resim Yükleyici Eklentisi Aktif! (React Version)");

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

    if (file) {
        // ESKİ KONTROL YERİNE YENİ SİSTEMİ KULLANIYORUZ
        const validationResult = validateFile(file);

        if (validationResult.isValid) {
            const imageUrl = URL.createObjectURL(file);

            // React Component'ini Sayfaya Enjekte Etme
            const existingRoot = document.getElementById('react-image-preview-root');
            if (existingRoot) existingRoot.remove();

            const appContainer = document.createElement('div');
            appContainer.id = 'react-image-preview-root';
            document.body.appendChild(appContainer);

            const root = ReactDOM.createRoot(appContainer);

            const onClose = () => {
                root.unmount();
                appContainer.remove();
                URL.revokeObjectURL(imageUrl);
            };

            const onUpload = (uploadedFile: File, storageDays: number) => {
                console.log(`'${uploadedFile.name}' dosyası, ${storageDays} gün depolama seçeneği ile yüklenecek.`);
            };

            root.render(
                <React.StrictMode>
                    <ImagePreviewPopup
                        file={file}
                        imageUrl={imageUrl}
                        onClose={onClose}
                        onUpload={onUpload}
                    />
                </React.StrictMode>
            );

        } else {
            // Geçersiz dosya durumunda kullanıcıyı bilgilendir
            alert(validationResult.error);
        }
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