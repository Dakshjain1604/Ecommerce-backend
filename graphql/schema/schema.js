// graphql/typeDefs/index.js
const productTypedef = require('./productTypedef');
const userTypedef = require('./userTypedef');
const orderTypedef = require('./orderTypedef');
const authTypedef=require('./authTypedef')

module.exports = [productTypedef, userTypedef, orderTypedef,authTypedef];
