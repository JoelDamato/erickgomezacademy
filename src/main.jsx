import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Footer from './pages/Footer.jsx'
import { pdfjs } from "react-pdf";
import { Toaster } from 'react-hot-toast';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
       <Toaster position="bottom-left" />
    <Footer />
  </StrictMode>,
)
