const url = 'https://ws-api.iextrading.com/1.0/last'
const socket = require('socket.io-client')(url)
const symbols = require('./Symbols');

module.exports = {

    connect: function (onMsg) {
        console.log(symbols.toQueryStr());
        socket.emit('subscribe', symbols.toQueryStr());
        socket.on('message', message => {
            onMsg(message);
            console.log(message);
        });
    },

}; 