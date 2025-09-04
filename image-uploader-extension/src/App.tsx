import { FiAlertCircle, FiCheckCircle, FiUploadCloud, FiX } from 'react-icons/fi'
import './App.css'
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function App() {

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/jpeg',]

  useEffect(() => {

    let fileUrl: string | null = null;
    if (droppedFile) {
      fileUrl = URL.createObjectURL(droppedFile);
      setImageUrl(fileUrl);
    }

    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    }
  }, [droppedFile])

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
    setError(null);

    const file = e.dataTransfer.files && e.dataTransfer.files[0];

    if (file) {
      if (ALLOWED_TYPES.includes(file.type)) {
        setDroppedFile(file);
      }
      else {
        setError("Yalnızca resim dosyaları kabul edilir!")
        setDroppedFile(null);
        setTimeout(() => { setError(null) }, 3000);
      }
    }
  };

  const removeFile = () => {
    setDroppedFile(null);
    setImageUrl(null);
  }

  const dropzoneVariants = {
    initial: { backgroundColor: "#ffffff" },
    dragging: { backgroundColor: "#eff6ff", scale: 1.05 },
    error: {
      backgroundColor: "#fee2e2",
      borderColor: "#ef4444",
      x: [0, -10, 10, -10, 10, 0]
    }
  };

  return (
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
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!error && !droppedFile && (
          <motion.div
            className="status-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FiUploadCloud size={50} />
            <p>Dosyanızı buraya sürükleyin</p>
            <span>veya</span>
            <button type="button">Dosya Seç</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {droppedFile && imageUrl && !error && (
          <motion.div
            className="image-preview"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <img src={imageUrl} alt={droppedFile.name} />
            <button onClick={removeFile} className="remove-btn">
              <FiX />
            </button>
            <div className="file-info">
              <FiCheckCircle className="success-icon" />
              <span>Yüklendi!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default App