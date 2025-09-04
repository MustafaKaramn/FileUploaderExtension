import { FiUploadCloud } from 'react-icons/fi'
import './App.css'
import { useEffect, useState } from 'react';

function App() {

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/jpeg',]

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

  return (
    <div className='container'>
      <div className='dropzone'
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <FiUploadCloud size={50} />
        <p>Dosyanızı buraya sürükleyin</p>
        <span>veya</span>
        <button>Dosya seç</button>
      </div>
    </div>
  );
}

export default App
