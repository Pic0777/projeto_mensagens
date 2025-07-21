async function fetchMessages() {
    const res = await fetch("/messages");
    const data = await res.json()   
    const list = document.getElementById("messageList");
    list.innerHTML = "";
    data.array.forEach(msg => {
        const li = document.createElement("li");
        li.textContent = `${msg.text} - ${new Date(msg.date).toLocaleTimeString()}`
        list.appendChild(li);
    });
}

async function sendMessage() {
    const text = document.getElementById("messageInput").value;
    await fetch("/messages",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text})
    });
    document.getElementById("messsageInput").value="";
    fetchMessages();
}

setInterval(fetchMessages, 5000);
fetchMessages();