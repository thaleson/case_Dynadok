import dotenv from 'dotenv';
dotenv.config();
import app from './app'; // Importando o app configurado com CORS e rotas
const PORT = process.env.PORT || 3005; // Certifique-se de definir um valor padrão caso a variável de ambiente não esteja presente

app.listen(PORT, () => {
  console.log(`Node API rodando na porta ${PORT}`);
});
