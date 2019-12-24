const
    io = require("socket.io-client"),
    ioClient = io.connect("http://localhost:8000");

ioClient.on("seq-num", (msg) => {
    console.info(msg);
    if (msg == '5') {
        console.info("----- subscribe----");
        ioClient.emit('subscribe', '');
    } else if (msg == '11') {
        console.info("-------unsubscribe-------");
        ioClient.emit('unsubscribe', '');
    }
});

ioClient.on("stock-k", (msg) => {
    console.info("stock-k:" + JSON.stringify( msg));
});