const symbols = require('./Symbols');

function StockList() {
    var self = this;

    self.data = [];




}

let map = new Map();

symbols.list.forEach(n => {
    map.set(n, new StockList());
});


module.exports = {

    add: function (msg) {

    }

}