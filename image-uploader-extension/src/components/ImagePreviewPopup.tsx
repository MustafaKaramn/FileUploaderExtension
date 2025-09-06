import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ImagePreviewPopupProps {
    imageUrl: string;
    onClose: () => void;
    onUpload: (storageDays: number) => void;
}

export const ImagePreviewPopup: React.FC<ImagePreviewPopupProps> = ({ imageUrl, onClose, onUpload }) => {
    const [storageDays, setStorageDays] = useState<number>(7);

    const handleUploadClick = () => {
        onUpload(storageDays);
        onClose();
    };

    return (
        <motion.div
            className="cs-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="cs-popup-container"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
                <img src={imageUrl} alt="Image Preview" className="cs-preview-image" />

                <div className="cs-options">
                    <label htmlFor="storage-days">Kaç gün depolansın?</label>
                    <select
                        id="storage-days"
                        value={storageDays}
                        onChange={(e) => setStorageDays(Number(e.target.value))}
                    >
                        <option value={1}>1 Gün</option>
                        <option value={7}>7 Gün</option>
                        <option value={30}>30 Gün</option>
                    </select>
                </div>

                <div className="cs-actions">
                    <button className="cs-btn cs-btn-secondary" onClick={onClose}>
                        İptal
                    </button>
                    <button className="cs-btn cs-btn-primary" onClick={handleUploadClick}>
                        Yükle
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};