import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import Message from './components/Message/Message';

function App() {
  const [isLogged, setIsLogged] = useState(true)
  const [isMessageOpne, setIsMessageOpen] = useState(false)

  return (
    <BrowserRouter>
        {isMessageOpne && <Message setIsMessageOpen={setIsMessageOpen}/>}
        {isLogged ? <Navbar isLogged={isLogged} setIsLogged={setIsLogged} setIsMessageOpen={setIsMessageOpen}/> : null}    
        <AppRouter isLogged={isLogged} setIsLogged={setIsLogged} />
    </BrowserRouter>
    
  );
}

export default App;