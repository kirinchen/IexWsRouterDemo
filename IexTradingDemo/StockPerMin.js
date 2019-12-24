const symbols = require('./Symbols');


function StockList(syb) {
    var self = this;
    self.data = [];
    self.symbol = syb;

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

    self.calcKData = function () {
        if (self.data.length <= 0) return null;
        var lowV = self.data[0].price, highV = self.data[0].price;
        var kData = {
            symbol: self.symbol,
            last: self.data[self.data.length-1],    
            first: self.data[0],    
            low: self.data[0],    
            high: self.data[0],    
        };
        for (var i = 0; i < self.data.length; i++) {
            var _d = self.data[i];
            if (lowV > _d.price) {
                kData.low = _d;
                lowV = _d.price;
            }
            if (highV < _d.price) {
                kData.high = _d;
                highV = _d.price;
            }

        }
        return kData;
    };


}



let map = new Map();

symbols.list.forEach(n => {
    map.set(n, new StockList(n));
    console.log("map add :" + n);
});


module.exports = {

    addData: function (msg) {
        var data = JSON.parse(msg);
        var symbol = data.symbol;
        var dao = map.get(symbol);
        dao.addData(data);
        return dao;
    },

    forEach: function (cb) {
        for (const [symbol, dao] of map.entries()) {
            cb(symbol, dao);
        }
    }



}