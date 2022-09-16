const connection = new signalR.HubConnectionBuilder().withUrl("/message").build();

connection.on("ReceiveMessage", (message) => {
    document.getElementById("messageShow").textContent = message;
});


connection.start().then(() => {
    document.getElementById("connction").className = "text-success"
    document.getElementById("connction").textContent = "Connected"
}).catch((err) => {
    document.getElementById("connction").className = "text-danger"
    document.getElementById("connction").textContent = "Not Connected"
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", (event) => {

    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessageAsync",message).catch( (err) => {
        return console.error(err.toString());
    });
    event.preventDefault();
});