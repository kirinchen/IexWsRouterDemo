module.exports = {

    list: ['FB', 'GOOGL', 'HP','AMD','F','GE','ACB','BAC','UBER','INTC'],

    toQueryStr: function() {
        return this.list.join(',');
    }



}; 