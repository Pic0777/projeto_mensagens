import express from 'express';
import cors from 'cors'

const app = express();

app.listen(3000, () =>{
    console.log("Servidor rodando em http://localhost:3000");
})

app.use(cors());
app.use(express.json())

let mensagens = [];

app.get("/mensagens", (req, res) =>{
    res.json(mensagens)
})

app.post("/mensagens", (req,res) =>{
    const {text} = req.body;
    if (!text) return res.status(400).json({error: "Mensagem vazia!"})

    const newMessage = {text, date: new Date()};
    mensagens.push(newMessage)

    res.status(201).json(newMessage)
})