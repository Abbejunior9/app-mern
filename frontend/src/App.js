import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/test');
        setMessage(res.data.message);
        setLoading(false);
      } catch (error) {
        console.error('Erreur:', error);
        setMessage('Erreur de connexion à l\'API');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Application MERN</h1>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <p>Message du serveur: {message}</p>
        )}
      </header>
    </div>
  );
}

export default App;
