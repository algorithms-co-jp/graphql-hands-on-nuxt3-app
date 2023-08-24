const { env } = require("process");

module.exports = {
  client: {
    service: {
      name: 'TodoApp',
      url: 'http://localhost:8080/v1/graphql',
      headers: {
        'x-hasura-admin-secret' : process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      },
      skipSSLValidation: true,
    },
    includes: ["pages/*.vue"],
    excludes: ["node_modules/**/*"]
  },
};