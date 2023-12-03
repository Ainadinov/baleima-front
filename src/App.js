import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import { useState } from 'react';

function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <BrowserRouter>
        <Navbar isLogged={isLogged} setIsLogged={setIsLogged} setIsOpen={setIsOpen}/>
        <AppRouter isLogged={isLogged} setIsLogged={setIsLogged} isOpen={isOpen}/>
    </BrowserRouter>
    
  );
}

export default App;