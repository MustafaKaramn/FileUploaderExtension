import { FiUploadCloud } from 'react-icons/fi'
import './App.css'
import { useState } from 'react';

function App() {

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ALLOWED_TYPES = ['image/jpeg','image/jpg','image/png','image/webp','image/gif','image/jpeg',]

  return (
    <div className='container'>
      <div className='dropzone'>
        <FiUploadCloud size={50} />
        <p>Dosyanızı buraya sürükleyin</p>
        <span>veya</span>
        <button>Dosya seç</button>
      </div>
    </div>
  );
}

export default App
