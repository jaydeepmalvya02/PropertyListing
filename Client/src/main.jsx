
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './context/AuthContex.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
