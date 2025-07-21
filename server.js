const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Servir arquivos estáticos

let messages = [];
let users = [];

// Criar novo usuário
app.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Nome de usuário é obrigatório!" });

  const newUser = { id: Date.now(), name };
  users.push(newUser);
  console.log("Novo usuário:", newUser);

  res.status(201).json(newUser);
});

// Criar nova mensagem
app.post("/messages", (req, res) => {
  const { userId, text } = req.body; // <-- corrigido (userId minúsculo)
  if (!userId || !text) return res.status(400).json({ error: "Dados inválidos!" });

  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "Usuário não encontrado!" });

  const newMessage = { userId, text, date: new Date() };
  messages.push(newMessage);

  res.status(201).json(newMessage);
});

// Listar mensagens
app.get("/messages", (req, res) => {
  const result = messages.map(m => ({
    name: users.find(u => u.id === m.userId)?.name || "Anônimo",
    text: m.text,
    date: m.date
  }));
  res.json(result);
});

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
