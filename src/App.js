import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import Message from './components/Message/Message';

function App() {
  const [isLogged, setIsLogged] = useState(() => {
    const storedIsLogged = localStorage.getItem('isLogged');
    return storedIsLogged ? JSON.parse(storedIsLogged) : false;
  });

  const [isMessageOpne, setIsMessageOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem('isLogged', JSON.stringify(isLogged));
  }, [isLogged]);

  return (
    <BrowserRouter>
        {isMessageOpne && <Message setIsMessageOpen={setIsMessageOpen}/>}
        {isLogged ? <Navbar  isLogged={isLogged} setIsLogged={setIsLogged} setIsMessageOpen={setIsMessageOpen}/> : null}    
        <AppRouter isLogged={isLogged} setIsLogged={setIsLogged} />
    </BrowserRouter>
    
  );
}

export default App;