let currentUserId = localStorage.getItem("userId") || null;

async function registerUser() {
  const name = document.getElementById("nameInput").value;
  if (!name) return alert("Digite um nome!");

  const res = await fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });

  const user = await res.json();
  currentUserId = user.id;
  localStorage.setItem("userId", currentUserId);

  alert(`Usuário registrado como ${name}`);
}

async function fetchMessages() {
  const res = await fetch("/messages");
  const data = await res.json();
  const list = document.getElementById("messageList");
  list.innerHTML = "";
  data.forEach(msg => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${msg.name}:</strong> ${msg.text} <small>(${new Date(msg.date).toLocaleTimeString()})</small>`;
    list.appendChild(li);
  });
}

async function sendMessage() {
  if (!currentUserId) {
    return alert("Você precisa registrar um nome antes de enviar mensagens.");
  }
  const text = document.getElementById("messageInput").value;
  if (!text) return alert("Digite uma mensagem!");

  await fetch("/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: currentUserId, text })
  });

  document.getElementById("messageInput").value = ""; // <-- corrigido "messsageInput"
  fetchMessages();
}

const input = document.getElementById("messageInput");
  input.addEventListener("keydown", function (event){
    if (event.key === "Enter") {
    sendMessage(); // Chama a função de enviar mensagem
    }
  })

setInterval(fetchMessages, 5000);
fetchMessages();
