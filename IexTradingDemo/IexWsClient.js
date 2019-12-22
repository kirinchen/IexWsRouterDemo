const url = 'https://ws-api.iextrading.com/1.0/last'
const socket = require('socket.io-client')(url)
const symbols = require('./Symbols');


socket.on('connect', () => {
    console.log(symbols.toQueryStr());
    socket.emit('subscribe', symbols.toQueryStr())
    socket.on('message', message => console.log(message))
})

//console.log("Running...");