import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Iniciar el servidor
app.listen(PORT, () => { 
  console.log(`Servidor run in http://localhost:${PORT}`);
});

// Routes
app.get('/', (req, res) => {
  res.send('Clean Project');
});