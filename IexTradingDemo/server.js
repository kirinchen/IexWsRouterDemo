const
    io = require("socket.io"),
    server = io.listen(8000),
    iexClient = require("./IexWsClient");

let sequenceNumberByClient = new Map();
iexClient.connect(msg => {
    console.log("Server:" + msg);
});

// event fired every time a new client connects:
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    sequenceNumberByClient.set(socket, 1);

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        sequenceNumberByClient.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });

    socket.on("subscribe", msg => {
        console.info(`test [id=${socket.id}] `+msg);
    });

});

// sends each client its current sequence number
setInterval(() => {
    for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
        client.emit("seq-num", sequenceNumber);
        sequenceNumberByClient.set(client, sequenceNumber + 1);
    }
}, 1000);