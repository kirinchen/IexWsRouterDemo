const
    io = require("socket.io-client"),
    ioClient = io.connect("http://localhost:8000");

ioClient.on("seq-num", (msg) => {
    console.info(msg);
    if (msg == '5') {
        console.info("It`s 9");
        ioClient.emit('subscribe', '');
    }
});

ioClient.on("stock-k", (msg) => {
    console.info("stock-k:" + JSON.stringify( msg));
});