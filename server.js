const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // <-- ADICIONE ESTA LINHA

let messages = [];

// Rotas de mensagens
app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Mensagem vazia" });

  const newMessage = { text, date: new Date() };
  messages.push(newMessage);

  res.status(201).json(newMessage);
});

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
