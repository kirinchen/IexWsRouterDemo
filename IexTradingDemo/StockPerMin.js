const symbols = require('./Symbols');

function StockList() {
    var self = this;
    self.data = [];

    self.addData = function (d) {
        d.time = Date.now();
        self.data.push(d);
        console.log("data:symbo:" + d.symbol + " l" + self.data.length);
        cleanExpire();
    };


    function cleanExpire() {
        self.data = self.data.filter(d => {
            return d.time > Date.now() - 60 * 1000;
        });
    }


}

let map = new Map();

symbols.list.forEach(n => {
    map.set(n, new StockList());
    console.log("map add :" + n);
});


module.exports = {

    add: function (msg) {
        var data = JSON.parse(msg);
        var symbol = data.symbol;
        map.get(symbol).addData(data);
    }

}