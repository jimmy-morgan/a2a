import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import MovieSales from './components/MovieSales';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (isAuth:boolean) => {
        setIsLoggedIn(isAuth);
    };

    return (
        <div className="App">
            <header className="App-header"><h1>A2A Movie Research</h1></header>
            <main> {isLoggedIn ? <MovieSales/> : <Login onLogin={handleLogin}/>} </main>
        </div>
    );
}
export default App;
