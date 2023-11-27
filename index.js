const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const routes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware per l'analisi del corpo delle richieste in formato JSON
app.use(express.json());

// Rotte per i post
app.use('/', routes);

// Rotte per l'autenticazione
app.use('/', authRoutes);

// Route di base per la radice
app.get('/', (req, res) => {
  res.send('Benvenuto nel mio server Express!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server online su: http://localhost:${port}`);
});
