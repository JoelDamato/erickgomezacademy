import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Footer from './pages/Footer.jsx'
import { pdfjs } from "react-pdf";
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './store/store.js';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
       <Toaster position="bottom-left" toastOptions={{
    duration: 5000,
  }} />
  </Provider>
    <Footer />
  </StrictMode>,
)
