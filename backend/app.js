import express from 'express';
import pessoaRoutes from './routes/Pessoa';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("API Rodando!");
});

app.use('/pessoas', pessoaRoutes);

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'juiz' && password === '123') {
    res.status(200).json({ msg: 'Login bem-sucedido!' });
  } else {
    res.status(401).json({ msg: 'Nome de usuário ou senha incorretos.' });
  }
});

app.listen(3000, () => console.log("API rodando na porta 3000..."));
