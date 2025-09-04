import { FiUploadCloud } from 'react-icons/fi'
import './App.css'

function App() {
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
