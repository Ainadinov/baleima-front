import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import Message from './components/Message/Message';

function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMessageOpne, setIsMessageOpen] = useState(false)
  const [is, set] = useState(true)

  return (
    <BrowserRouter>
        {isMessageOpne && <Message setIsMessageOpen={setIsMessageOpen}/>}
        <Navbar isLogged={isLogged} setIsLogged={setIsLogged} setIsOpen={setIsOpen} setIsMessageOpen={setIsMessageOpen} set={set}/>
        <AppRouter isLogged={isLogged} setIsLogged={setIsLogged} isOpen={isOpen} is={is}/>
    </BrowserRouter>
    
  );
}

export default App;