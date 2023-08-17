<template>
  <div v-if="fetching">
    Loading...
  </div>
</template>

<script setup>
import { gql, useQuery } from '@urql/vue';

const result = useQuery({
  query: gql`
    {
      tasks(limit: 100) {
        id
        title
        body
      }
    }
  `
});
</script>