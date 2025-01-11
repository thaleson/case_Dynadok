import express from 'express';
import cors from 'cors'; // Importando o CORS
import tasksRoutes from './routes/tasksRoutes'; // Importando as rotas
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Front-end permitido
  methods: ['GET', 'POST', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Cabeçalhos permitidos
};

// Middleware CORS
app.use(cors(corsOptions)); // Habilita CORS com as opções
app.use(express.json()); // Middleware para lidar com JSON
app.use('/tasks', tasksRoutes); // Definindo a rota de tasks

export default app; // Exporte o app para ser usado no index.ts
