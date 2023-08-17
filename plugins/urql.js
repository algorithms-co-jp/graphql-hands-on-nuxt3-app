import { Client, cacheExchange, fetchExchange } from '@urql/vue';
import urql from '@urql/vue';
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const graphqlClient = new Client({
    url: runtimeConfig.public.endPoint,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => {
      return {
        headers: {
          'x-hasura-admin-secret': runtimeConfig.public.apiKey,
        },
      }
    },
  });

  nuxtApp.vueApp.use(urql, graphqlClient);
});