const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // <-- ADICIONE ESTA LINHA

let messages = [];
let users = [];

// Rotas de mensagens
app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/users",(req,res) =>{
  const {name} = req.body;
  if(!name) return res.status(400).json({error: "Nome de usuário é obrigatório!"});

  const newUser ={id: Date.now(), name};
  users.push(newUser);
  console.log("Novo usuário: ", newUser);

  res.status(201).json(newUser)
})

app.post("/messages", (req, res) => {
  const {userID, text} = req.body;
  if (!userID || !text) return res.status(400).json({ error: "Dados inválidos!" });

  const user = users.find(u => u.id === userID);
  if(!user) return res.status(404).json({error: "Usuário não encontrado!"})

  const newMessage = {userID, text, date: new Date() };
  messages.push(newMessage);

  res.status(201).json(newMessage);
});

app.get("/messages",(req,res) =>{
  const result = messages.map(m =>({
    name: users.find(u => u.id === m.userID)?.name || "Anônimo",
    text: m.text,
    date: m.date
  }));
  res.json(result)
})

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
