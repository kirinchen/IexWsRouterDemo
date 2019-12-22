module.exports = {

    list: ['FB', 'GOOGL', 'HP'],

    toQueryStr: function() {
        return this.list.join(',');
    }

}; 