import { FiAlertCircle, FiUploadCloud } from 'react-icons/fi'
import './App.css'
import { useRef, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { validateFile } from './utils/fileValitation';
import { ImagePreviewPopup } from './components/ImagePreviewPopup';

function App() {

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    const validationResult = validateFile(file);

    if (validationResult.isValid) {
      setError(null);
      setDroppedFile(file);
    } else {
      setDroppedFile(null);
      setError(validationResult.error);
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  // Butona tıklandığında gizli input'u tetikler
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Gizli input'tan dosya seçildiğinde çalışır
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleClosePreview = () => {
    setDroppedFile(null);
  };

  const handleUpload = (fileToUpload: File, storageDays: number) => {
    console.log(`'${fileToUpload.name}' dosyası, ${storageDays} gün seçeneği ile ana popup'tan yüklenecek.`);
    // .NET SUNUCUYA YÜKLEME KODU BURAYA GELECEK
    handleClosePreview();
  };

  const dropzoneVariants: Variants = {
    initial: { backgroundColor: "#ffffff" },
    dragging: { backgroundColor: "#eff6ff", scale: 1.05 },
    error: {
      backgroundColor: "#fee2e2",
      borderColor: "#ef4444",
      x: [0, -10, 10, -10, 10, 0],
      transition: {
        x: { duration: 0.5, ease: "easeInOut" },
        default: { type: "spring", stiffness: 300, damping: 20 },
      },
    }
  };

  return (
    droppedFile ? (
      <ImagePreviewPopup
        file={droppedFile}
        imageUrl={URL.createObjectURL(droppedFile)}
        onClose={handleClosePreview}
        onUpload={handleUpload}
      />
    ) : (
      <motion.div
        className='dropzone'
        variants={dropzoneVariants}
        animate={error ? "error" : isDragging ? "dragging" : "initial"}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <AnimatePresence>
          {error && (
            <motion.div
              className="status-indicator error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <FiAlertCircle size={50} />
              <p style={{ fontSize: "0.8rem", maxWidth: "90%" }}>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!error && (
            <motion.div
              className="status-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FiUploadCloud size={50} />
              <p>Dosyanızı buraya sürükleyin</p>
              <span>veya</span>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
              />
              <button type="button" onClick={handleButtonClick}>Dosya Seç</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  );
}

export default App