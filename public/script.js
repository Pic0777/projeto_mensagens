let currentUserId = localStorage.getItem("userId") || null;

// Mostra o perfil
function mostrarPerfil(name) {
  const profile = document.getElementById("profile");
  profile.innerHTML = ""; // Limpa inputs
  const h1 = document.createElement("h1");
  h1.innerHTML = `${name}`;
  profile.appendChild(h1);
}

// Registrar usuário
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
  localStorage.setItem("userName", name);

  alert(`Usuário registrado como ${name}`);
  mostrarPerfil(name);
}

// Buscar mensagens
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

// Enviar mensagens
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

  document.getElementById("messageInput").value = "";
  fetchMessages();
}

// Evento para enviar com Enter
const input = document.getElementById("messageInput");
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// Quando a página carregar
window.onload = function () {
  const savedName = localStorage.getItem("userName");
  if (savedName) {
    mostrarPerfil(savedName);
  }
};

setInterval(fetchMessages, 5000);
fetchMessages();
