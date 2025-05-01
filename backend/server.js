const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Charger les variables d'environnement
dotenv.config();

// Initialiser Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connecté'))
.catch((err) => console.error('❌ Erreur MongoDB:', err));

// Exemple de route API
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ API fonctionne correctement' });
});

// Servir le frontend React
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
