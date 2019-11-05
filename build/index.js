"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Test {\n    message: String\n  }\n\n  type Query {\n    test: String\n  }\n"], ["\n  type Test {\n    message: String\n  }\n\n  type Query {\n    test: String\n  }\n"])));
var resolvers = {
    Query: {
        test: function () { return 'Hola Mundo'; }
    }
};
var server = new apollo_server_1.ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
var templateObject_1;
