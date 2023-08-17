// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiKey: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      endPoint: "http://localhost:8080/v1/graphql",
    },
  },
  routeRules: {
    "/**": { ssr: false },
  },
});