// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiKey: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      endPoint: process.env.HASURA_GRAPHQL_ENDPOINT,
    },
  },
  routeRules: {
    "/**": { ssr: false },
  },
  modules: ["@nuxtjs/tailwindcss"],
});