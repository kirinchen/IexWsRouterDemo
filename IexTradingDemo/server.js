const
    io = require("socket.io"),
    server = io.listen(8000),
    iexClient = require("./IexWsClient"),
    stockDaos = require("./StockPerMin");

function SubscribeList() {
    var list = [];
    var self = this;

    self.add = function (socket) {
        if (self.exist(socket)) return;
        list.push(socket);
    };

    self.remove = function (socket) {
        list.splice(getIdx(socket.id), 1);
    };

    self.exist = function (socket) {
        return getIdx(socket.id) >= 0;
    };

    self.post = function (data) {
        for (var i = 0; i < list.length; i++) {
            list[i].emit("stock-k", data);
        }
    };

    self.getList = () =>  list;

    function getIdx(id) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === id) return i;
        }
        return -1;
    }

}

var subscribeList = new SubscribeList();

iexClient.connect(msg => {
    //console.log("Server:" + msg);
    var dao= stockDaos.addData(msg);
    subscribeList.post(dao.calcKData());
});


var _soDev;
// event fired every time a new client connects:
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    _soDev = socket;

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        /*sequenceNumberByClient.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);*/
        subscribeList.remove(socket);
    });

    socket.on("subscribe", msg => {
        console.info(`subscribe [id=${socket.id}] ` + msg);
        subscribeList.add(socket);
        stockDaos.forEach((syb, dao) => {
            subscribeList.post(dao.calcKData());
        });
    });

    socket.on("unsubscribe", msg => {
        console.info(`unsubscribe [id=${socket.id}] ` + msg);
        subscribeList.remove(socket);
    });

});

// sends each client its current sequence number
var _devCount=0;
setInterval(() => {
    if (_soDev == null) return;
    _soDev.emit("seq-num", _devCount++);
}, 1000);